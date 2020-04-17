import {RouteHandler} from "../../types/express";
import {plaidLink} from "../../views/plaid-link";
import {Environment} from "../../types/environment";

export const getLinkHandler: (e: Environment) => RouteHandler = env => (req, res) => {
    if (!env.PLAID_ACCESS_TOKEN) {
        res.send(plaidLink(env.PLAID_PUBLIC_KEY));
        res.status(200);
        return res.end();
    }

    res.status(409); // conflict as we already have a token
    res.end();
}