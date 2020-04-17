import Plaid from 'plaid';
import {AccountTransaction} from "../../../types/database";

export const apiTransactionToDB = (transaction: Plaid.Transaction): AccountTransaction => ({
    id: transaction.transaction_id,
    amount: transaction.amount || 0,
    utcTimestamp: new Date(transaction.date).getTime(),
    isoCurrency: transaction.iso_currency_code,
    name: transaction.name,
    category: transaction.category_id,
    pending: transaction.pending ? 1 : 0,
    bankAccountId: transaction.account_id,
    pendingTransactionId: transaction.pending_transaction_id
})