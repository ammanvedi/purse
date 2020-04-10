import {AccountTransaction} from "../../../types/database";

export const addOrUpdateAccountTransaction = (transaction: AccountTransaction): string => `
    INSERT INTO accountTransactions (id, amount, utcTimestamp, isoCurrency, name, category, pending, paymentChannel, bankAccountId, pendingTransactionId)
    VALUES (
            "${transaction.id}",
            ${transaction.amount},
            ${transaction.utcTimestamp},
            "${transaction.isoCurrency}",
            "${transaction.name}",
            "${transaction.category}",
            ${transaction.pending},
            "${transaction.paymentChannel}",
            "${transaction.bankAccountId}",
            "${transaction.pendingTransactionId}"
            )
    ON CONFLICT(id) DO UPDATE SET
        pending=excluded.pending,
        pendingTransactionId=excluded.pendingTransactionId
`;

export const setTransferTransactionId = (baseTransactionId: string, relatedTransactionId: string): string => `
    UPDATE accountTransactions
    SET transferTransactionId = "${relatedTransactionId}"
    WHERE
        id = "${baseTransactionId}"
`;