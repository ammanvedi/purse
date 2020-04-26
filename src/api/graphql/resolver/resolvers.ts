import {Resolvers} from "../../../types/graphql";
import {ServerContext} from "../../../types/apollo-server";
import {accountsResolver} from "./query/accounts";
import {forecastResolver} from "./query/forecast";
import {
    createExpenseMutationResolver,
    deleteExpenseMutationResolver,
    updateExpenseMutationResolver
} from "./mutation/expense";

export const resolvers: Resolvers<ServerContext> = {
    Mutation: {
        createExpense: createExpenseMutationResolver,
        updateExpense: updateExpenseMutationResolver,
        deleteExpense: deleteExpenseMutationResolver,
    },
    Query: {
        accounts: accountsResolver,
        forecast: forecastResolver
    }
}