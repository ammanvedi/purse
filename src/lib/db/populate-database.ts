import Plaid from "plaid";
import sql from "sqlite3";
import {readFileSync, writeFileSync} from "fs";
import {getDateFromISO} from "../helper/date";

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

export const runSQL = (database: sql.Database, statement: string): Promise<sql.Database> => {
  return new Promise((resolve, reject) => {
    database.run(statement, err => {
      if (err) {
        return reject(err);
      }
      resolve(database);
    });
  })
}

export const createSchema = (database: sql.Database): Promise<sql.Database> => {
  const accountHolder = readFileSync("lib/db/schema/account-holder.sql").toString();
  const bankAccount = readFileSync("lib/db/schema/bank-account.sql").toString();
  const categories = readFileSync("lib/db/schema/categories.sql").toString();
  const accountTransactions = readFileSync("lib/db/schema/account-transactions.sql").toString();
  const expense = readFileSync("lib/db/schema/expense.sql").toString();
  const expenseTransaction = readFileSync("lib/db/schema/expense-transaction.sql").toString();
  return runSQL(database, accountHolder)
      .then(db => runSQL(db, bankAccount))
      .then(db => runSQL(db, categories))
      .then(db => runSQL(db, accountTransactions))
      .then(db => runSQL(db, expense))
      .then(db => runSQL(db, expenseTransaction))
};

export const populateDatabase = async (
  client: Plaid.Client,
  accessToken: string,
  db: sql.Database
): Promise<void> => {
  const now = Date.now();
  const endDate = getDateFromISO(new Date(now));
  const threeMonths = 1000 * 60 * 60 * 24 * 30 * 3;
  const threeMonthsAgo = now - threeMonths;
  const threeMonthsAgoDate = new Date(threeMonthsAgo);
  threeMonthsAgoDate.setDate(1);

  const categories = await client.getCategories()

  const startDate = getDateFromISO(threeMonthsAgoDate);
  const { accounts } = await client.getAccounts(accessToken);

  const ps = accounts.map(account => {
    return client
        .getAllTransactions(accessToken, startDate, endDate, {
          account_ids: [account.account_id]
        })
        .then(res => {
          return Promise.resolve();
        });
  });

  await Promise.all(ps)
};
