import plaid from "plaid";
import express from "express";
import {loadView} from "./helpers";

const app = express();

app.use(express.json());


let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;

const client = new plaid.Client(
  "5d2f4bd4dc87a6001424749d", // client id
  "15be49bd6e75b60547b66844007a5a", //secret
  "57975d9f7edf89bde2ca046cb28e68", // pub key
  plaid.environments.development
);

app.post("/get_access_token", function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error !== null) {
      console.log("Could not exchange public_token!" + "\n" + error);
      return response.json({ error });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    let ITEM_ID = tokenResponse.item_id;
    console.log("Access Token: " + ACCESS_TOKEN);
    console.log("Item ID: " + ITEM_ID);
    response.json({ error: false });
  });
});

app.get("/", (req, res) => {
  res.send(loadView('index')).end(200);
})

app.listen(8000, () => {
  console.log('Serving')
});
