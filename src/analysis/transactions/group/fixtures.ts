import {NormalisedTransaction} from "../../../types/NormalisedTransaction";

export const testTransactions = [
    {
        merchant: 'a',
        id: 1
    },
    {
        merchant: 'c',
        id: 2
    },
    {
        merchant: 'c',
        id: 3
    },
    {
        merchant: 'a',
        id: 4
    },
    {
        merchant: 'b',
        id: 5
    },
] as unknown as Array<NormalisedTransaction>;