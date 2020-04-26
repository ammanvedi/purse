import { MutationResolvers } from "../../../../types/graphql";
import { ServerContext } from "../../../../types/apollo-server";

export const createExpenseMutationResolver: MutationResolvers<
  ServerContext
>["createExpense"] = (parent, args, context, info) => {

};

export const updateExpenseMutationResolver: MutationResolvers<
  ServerContext
>["updateExpense"] = (parent, args, context, info) => {};

export const deleteExpenseMutationResolver: MutationResolvers<
  ServerContext
>["deleteExpense"] = (parent, args, context, info) => {};
