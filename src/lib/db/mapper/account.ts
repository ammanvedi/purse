import Plaid from 'plaid';
import {BankAccount} from "../../../types/database";

export const apiAccountToDB = (account: Plaid.Account, holderId: number): BankAccount => ({
    accountHolderId: holderId,
    accountName: account.name || 'Un-named Account',
    accountType: account.type || 'unknown',
    balanceAvailable: account.balances.available || 0,
    balanceCurrent: account.balances.current || 0,
    id: account.account_id,
    isoCurrency: account.balances.iso_currency_code || 'UNKNOWN'
})