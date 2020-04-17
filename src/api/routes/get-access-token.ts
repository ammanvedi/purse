import { RouteHandler } from "../../types/express";
import Plaid from "plaid";

export const getAccessTokenHandler: (
  c: Plaid.Client
) => RouteHandler = client => (req, res) => {
  const PUBLIC_TOKEN = req.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      return res.json({ error });
    }
    res.json({ error: false, tokenResponse });
  });
};
