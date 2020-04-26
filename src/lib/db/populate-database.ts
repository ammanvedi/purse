import Plaid from "plaid";
import sql from "sqlite3";
import { readFileSync, writeFileSync } from "fs";
import { getDateFromISO } from "../helper/date";
import { apiCategoryToDB } from "./mapper/category";
import { addOrUpdateCategory } from "./insert/categories";
import { logError, logInfo, logSuccess } from "../logger";
import { apiAccountToDB } from "./mapper/account";
import { addOrUpdateBankAccount } from "./insert/bank-account";
import { apiTransactionToDB } from "./mapper/transaction";
import {
  addOrUpdateAccountTransaction,
  setTransferTransactionId
} from "./insert/account-transactions";
import {
  findMatchingOutgoingTransaction,
  getAllIncomingTransactions
} from "./select/account-transactions";
import { AccountTransaction } from "../../types/database";

export const createDatabase = (location: string): Promise<sql.Database> => {
  return new Promise((resolve, reject) => {
    const db = new sql.Database(location, err => {
      if (err) {
        return reject(err);
      }
      resolve(db);
    });
  });
};

export const runSQL = (
  database: sql.Database,
  statement: string
): Promise<sql.Database> => {
  return new Promise((resolve, reject) => {
    database.run(statement, err => {
      if (err) {
        return reject(err);
      }
      resolve(database);
    });
  });
};

export const runSQLGetAllRows = <ResultRowType>(
  database: sql.Database,
  statement: string
): Promise<Array<ResultRowType>> => {
  return new Promise((resolve, reject) => {
    database.all(statement, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows as Array<ResultRowType>);
    });
  });
};

export const createSchema = (database: sql.Database): Promise<sql.Database> => {
  const accountHolder = readFileSync(
    "lib/db/schema/account-holder.sql"
  ).toString();
  const bankAccount = readFileSync("lib/db/schema/bank-account.sql").toString();
  const categories = readFileSync("lib/db/schema/categories.sql").toString();
  const accountTransactions = readFileSync(
    "lib/db/schema/account-transactions.sql"
  ).toString();
  const expense = readFileSync("lib/db/schema/expense.sql").toString();
  const expenseTransaction = readFileSync(
    "lib/db/schema/expense-transaction.sql"
  ).toString();
  return runSQL(database, accountHolder)
    .then(db => runSQL(db, bankAccount))
    .then(db => runSQL(db, categories))
    .then(db => runSQL(db, accountTransactions))
    .then(db => runSQL(db, expense))
    .then(db => runSQL(db, expenseTransaction));
};

export const resolveInterAccountTransfers = async (
  db: sql.Database
): Promise<void> => {
  const incomingTransactions = await runSQLGetAllRows<AccountTransaction>(
    db,
    getAllIncomingTransactions
  );

  for (let i = 0; i < incomingTransactions.length; i++) {
    const incomingTransaction = incomingTransactions[i];

    if (!incomingTransaction.id) {
      continue;
    }

    const outgoingTransactions = await runSQLGetAllRows<AccountTransaction>(
      db,
      findMatchingOutgoingTransaction(
        incomingTransaction.bankAccountId,
        incomingTransaction.amount * -1,
        incomingTransaction.utcTimestamp
      )
    );

    if (outgoingTransactions.length !== 1) {
      logError(
        `Attempted to link ${
          incomingTransaction.id
        } but did not find exactly one transaction instead found ${
          outgoingTransactions.length
        } instead. ${outgoingTransactions.map(t => t.id).join(", ")}`
      );
      continue;
    }

    const [outgoingTransaction] = outgoingTransactions;

    if (!outgoingTransaction.id) {
      continue;
    }

    try {
      logInfo(
        `Linking inter account transactions ${incomingTransaction.id} -> ${outgoingTransaction.id}`
      );
      await runSQL(
        db,
        setTransferTransactionId(incomingTransaction.id, outgoingTransaction.id)
      );
      await runSQL(
        db,
        setTransferTransactionId(outgoingTransaction.id, incomingTransaction.id)
      );
      logSuccess(
        `Linked inter account transactions ${incomingTransaction.id} -> ${outgoingTransaction.id}`
      );
    } catch (e) {
      logError(
        `Failed linking inter account transactions ${incomingTransaction.id} -> ${outgoingTransaction.id}`
      );
      logError(e);
    }
  }
};

export const populateDatabase = async (
  client: Plaid.Client,
  accessToken: string,
  db: sql.Database,
  holderId: number
): Promise<void> => {
  const now = Date.now();
  const endDate = getDateFromISO(new Date(now));
  const threeMonths = 1000 * 60 * 60 * 24 * 30 * 3;
  const threeMonthsAgo = now - threeMonths;
  const threeMonthsAgoDate = new Date(threeMonthsAgo);
  threeMonthsAgoDate.setDate(1);

  const { categories } = await client.getCategories();
  for (let i = 0; i < categories.length; i++) {
    const modeled = apiCategoryToDB(categories[i]);
    const insertQuery = addOrUpdateCategory(modeled);
    try {
      logInfo(`Attempting to upsert category ${modeled.id}`);
      await runSQL(db, insertQuery);
      logSuccess(`Inserted category ${modeled.id}`);
    } catch (e) {
      logError(`Failed to insert category ${modeled.id}`);
      logError(e);
    }
  }

  const startDate = getDateFromISO(threeMonthsAgoDate);
  const { accounts } = await client.getAccounts(accessToken);

  for (let i = 0; i < accounts.length; i++) {
    const modeled = apiAccountToDB(accounts[i], holderId);
    const insertQuery = addOrUpdateBankAccount(modeled);
    try {
      logInfo(`Attempting to upsert bank account ${modeled.id}`);
      await runSQL(db, insertQuery);
      logSuccess(`Inserted bank account ${modeled.id}`);
    } catch (e) {
      logError(`Failed to insert bank account ${modeled.id}`);
      logError(e);
    }

    const { transactions } = await client.getAllTransactions(
      accessToken,
      startDate,
      endDate,
      {
        account_ids: [accounts[i].account_id]
      }
    );

    for (let i = 0; i < transactions.length; i++) {
      const modeled = apiTransactionToDB(transactions[i]);
      const insertQuery = addOrUpdateAccountTransaction(modeled);
      try {
        logInfo(`Attempting to upsert transaction ${modeled.id}`);
        await runSQL(db, insertQuery);
        logSuccess(`Inserted transaction ${modeled.id}`);
      } catch (e) {
        logError(`Failed to insert transaction ${modeled.id}`);
        logError(e);
      }
    }
  }

  await resolveInterAccountTransfers(db);
};
