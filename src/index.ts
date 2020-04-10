import Plaid from "plaid";
import express from "express";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

import { Environment } from "./types/environment";
import { plaidLink } from "./views/plaid-link";
import {createDatabase, createSchema} from "./lib/db/populate-database";

dotenv.config();

const env: Environment = {
  PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID || "",
  PLAID_SECRET: process.env.PLAID_SECRET || "",
  PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY || "",
  PLAID_ENV: Plaid.environments.development,
  PURSE_PORT: parseInt(process.env.PURSE_PORT || ""),
  PLAID_ACCESS_TOKEN: process.env.PLAID_ACCESS_TOKEN || "",
  PURSE_DB_PATH: process.env.PURSE_DB_PATH || ''
};

const app = express();
app.use(express.json());

const plaidClient = new Plaid.Client(
  env.PLAID_CLIENT_ID,
  env.PLAID_SECRET,
  env.PLAID_PUBLIC_KEY,
  Plaid.environments.development
);

createDatabase(env.PURSE_DB_PATH)
    .then(createSchema)
    .then(db => {

    })
    .catch(err => {
      console.log('Something failed when creating the database...')
      console.log(err)
    })

app.get("/download-data", async () => {
  const getDateFromISO = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const now = Date.now();
  const endDate = getDateFromISO(new Date(now));
  const threeMonths = 1000 * 60 * 60 * 24 * 30 * 3;
  const threeMonthsAgo = now - threeMonths;
  const threeMonthsAgoDate = new Date(threeMonthsAgo);
  threeMonthsAgoDate.setDate(1);

  const categories = await plaidClient.getCategories()
  console.log(JSON.stringify(categories))

  const startDate = getDateFromISO(threeMonthsAgoDate);
  const { accounts } = await plaidClient.getAccounts(env.PLAID_ACCESS_TOKEN);
  writeFileSync("accounts.json", JSON.stringify(accounts));

  const ps = accounts.map(account => {
    return plaidClient
      .getAllTransactions(env.PLAID_ACCESS_TOKEN, startDate, endDate, {
        account_ids: [account.account_id]
      })
      .then(res => {
        writeFileSync(
          `transactions_${account.account_id}.json`,
          JSON.stringify(res)
        );
        return Promise.resolve();
      });
  });

  await Promise.all(ps);
});

app.get("/link", (req, res) => {
  if (!env.PLAID_ACCESS_TOKEN) {
    res.send(plaidLink(env.PLAID_PUBLIC_KEY));
    res.status(200);
    return res.end();
  }

  res.status(409); // conflict as we already have a token
  res.end();
});

app.post("/get_access_token", (req, res) => {
  const PUBLIC_TOKEN = req.body.public_token;
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      console.log("Could not exchange public_token!" + "\n" + error);
      return res.json({ error });
    }
    console.log(JSON.stringify(tokenResponse));
    const ACCESS_TOKEN = tokenResponse.access_token;
    const ITEM_ID = tokenResponse.item_id;
    console.log("Access Token: " + ACCESS_TOKEN);
    console.log("Item ID: " + ITEM_ID);
    res.json({ error: false });
  });
});

app.listen(env.PURSE_PORT);
