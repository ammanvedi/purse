import {NormalisedTransaction} from "./NormalisedTransaction";

export type GroupedTransactions = {
    [key: string]: Array<NormalisedTransaction>
}