import Plaid from "plaid";
import express from "express";
import dotenv from "dotenv";

import { Environment } from "./types/environment";
import {createDatabase, createSchema, populateDatabase} from "./lib/db/populate-database";
import { getLinkHandler } from "./api/routes/get-link";
import { getAccessTokenHandler } from "./api/routes/get-access-token";
import {DATA_REFRESH_MS} from "./constants";

dotenv.config();

const env: Environment = {
  PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID || "",
  PLAID_SECRET: process.env.PLAID_SECRET || "",
  PLAID_PUBLIC_KEY: process.env.PLAID_PUBLIC_KEY || "",
  PLAID_ENV: Plaid.environments.development,
  PURSE_PORT: parseInt(process.env.PURSE_PORT || ""),
  PLAID_ACCESS_TOKEN: process.env.PLAID_ACCESS_TOKEN || "",
  PURSE_DB_PATH: process.env.PURSE_DB_PATH || ""
};

createDatabase(env.PURSE_DB_PATH)
  .then(createSchema)
  .then(db => {
    const app = express();
    app.use(express.json());

    const plaidClient = new Plaid.Client(
      env.PLAID_CLIENT_ID,
      env.PLAID_SECRET,
      env.PLAID_PUBLIC_KEY,
      Plaid.environments.development
    );

    app.get("/link", getLinkHandler(env));
    app.post("/get_access_token", getAccessTokenHandler(plaidClient));

    app.listen(env.PURSE_PORT);

    const populateDatabaseFunc = populateDatabase.bind(null, plaidClient, env.PLAID_ACCESS_TOKEN, db, 1);

    setInterval(populateDatabaseFunc, DATA_REFRESH_MS);

    populateDatabaseFunc()
        .then(() => {
          console.log('Finished syncing bank data')
        })

  })
  .catch(err => {
    console.log("Something failed when creating the database...");
    console.log(err);
  });
