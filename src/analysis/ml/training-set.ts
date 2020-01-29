import { NormalisedTransaction } from "../../types/NormalisedTransaction";
import { Tensor } from "@tensorflow/tfjs-core";
import {iterateDateRange, toYMDString} from "../dates/helpers";
import {featuresToTensor, getFeaturesForDay} from "./features";
import {HolidayService} from "../holidays/HolidayService";
import {groupTransactionsByDate} from "../transactions/group/group";
import {DayFeatures} from "../../types/Feature";

type ClassificationCategory = 0 | 1;
type TrainingSetItem = [Tensor, ClassificationCategory, DayFeatures, Date];

type TrainingSet = Array<TrainingSetItem>;

type TransactionsByDate = {
    [key: string]: NormalisedTransaction,
}

export const createTrainingSetFromTransactions = (
  transactions: Array<NormalisedTransaction>,
  holidayService: HolidayService
): TrainingSet => {

    const firstTransactionDate = transactions[transactions.length - 1].date;
    const lastTransactionDate = transactions[0].date;

    const transactionsByDate = groupTransactionsByDate(transactions);

    const trainingSet: TrainingSet = [];

    iterateDateRange(firstTransactionDate, lastTransactionDate, date => {
        const dateString = toYMDString(date);

        const features = getFeaturesForDay(
            date.toISOString(),
            holidayService,
        );

        const featuresTensor = featuresToTensor(features);

        const hadTransactions = transactionsByDate[dateString];

        trainingSet.push([
            featuresTensor,
            hadTransactions ? 1 : 0,
            features,
            date
        ]);
    });

    return trainingSet;
};
