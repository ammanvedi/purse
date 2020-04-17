export const getAllIncomingTransactions =
  "SELECT * FROM accountTransactions WHERE amount < 0";

export const findMatchingOutgoingTransaction = (
  sourceAccountId: string,
  amount: number,
  timestamp: number
) =>
  `SELECT * FROM accountTransactions WHERE amount = ${amount} AND utcTimestamp = ${timestamp} AND NOT bankAccountId = "${sourceAccountId}"`;
