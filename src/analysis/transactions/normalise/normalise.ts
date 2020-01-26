import {Transaction} from "plaid";
import {NormalisedTransaction, TransactionType} from "../../../types/NormalisedTransaction";
import {Currency} from "../../../types/Currency";
import {transactions} from "./fixtures";

const DATE_REGEX = /\sON\s([0-9]{2})\s([A-Z]{3})\s[A-Z]{3}\s?/;

const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

// TODO - fix turn of the year edge case
const getRealTransactionDate = (originalDate: string, name: string): string => {
    const result = DATE_REGEX.exec(name);

    if (!result) {
        return originalDate;
    }

    const [year] = originalDate.split('-');

    const [_, dayOfMonth, monthName] = result;

    const monthIndex = months.indexOf(monthName) + 1;
    const monthString = monthIndex.toString().padStart(2, '0');

    const dayString = dayOfMonth.padStart(2, '0');
    // console.log('name', name);
    // console.log('orig', originalDate);
    // console.log('res', `${year}-${monthString}-${dayString}`)
    return `${year}-${monthString}-${dayString}`;

}

export const parseName = (name: string | null): string => {
    if (!name) {
        return TransactionType.UNKNOWN;
    }
    return name.replace(DATE_REGEX, ' ');
}

export const normaliseTransaction = (transaction: Transaction): NormalisedTransaction => {
    return {
        amount: transaction.amount || 0,
        currencyCode: (transaction.iso_currency_code as Currency) || Currency.UNKNOWN,
        date: transaction.name ? getRealTransactionDate(transaction.date, transaction.name) : transaction.date,
        id: transaction.transaction_id,
        merchant: parseName(transaction.name)
    }
};

export const normaliseTransactions = (transactions: Array<Transaction>): Array<NormalisedTransaction> => {
    return transactions.map(normaliseTransaction);
};