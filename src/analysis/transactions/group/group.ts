import { NormalisedTransaction } from "../../../types/NormalisedTransaction";
import { GroupedTransactions } from "../../../types/GroupedTransactions";

/**
 * The transactions should be ordering in date descending, this function will maintain that natural ordering
 */
export const groupTransactionsByMerchant = (
  transactions: Array<NormalisedTransaction>
): GroupedTransactions => {
  return transactions.reduce<GroupedTransactions>((grouped, transaction) => {
    if (!grouped[transaction.merchant]) {
      grouped[transaction.merchant] = [];
    }

    grouped[transaction.merchant].push(transaction);
    return grouped;
  }, {});
};

export const groupTransactionsByDate = (
  transactions: Array<NormalisedTransaction>
): GroupedTransactions => {
  return transactions.reduce<GroupedTransactions>((grouped, transaction) => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = [];
    }

    grouped[transaction.date].push(transaction);
    return grouped;
  }, {});
};
