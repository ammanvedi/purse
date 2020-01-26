import {Currency} from "./Currency";

type ISODate = string;

export enum TransactionType {
    UNKNOWN = 'UNKNOWN'
}

export type NormalisedTransaction = {
    id: string,
    merchant: string | TransactionType.UNKNOWN,
    amount: number,
    date: ISODate,
    currencyCode: Currency,
}