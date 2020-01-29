import { transactions } from "../transactions/normalise/fixtures";
import { groupTransactionsByMerchant } from "../transactions/group/group";
import { normaliseTransactions } from "../transactions/normalise/normalise";
import { createTrainingSetFromTransactions } from "./training-set";
import { HolidayService } from "../holidays/HolidayService";
import { previousHolidays } from "../holidays/fixtures";
import * as tf from "@tensorflow/tfjs-node";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import {featuresToTensor, INPUT_TENSOR_LENGTH} from "./features";
import { predictForDateRange } from "./predict";
import {getCSVTrainingSet, getOneHotArray} from "./helpers";

import { autocorrelation } from 'autocorrelation';
import peakFinding from 'peak-finding';

import { createObjectCsvWriter } from 'csv-writer';

describe("Training Set", () => {
  it("trains model", async () => {

    const csvWriter = createObjectCsvWriter({
      path: './out.csv',
      header: [
        {id: 'week_day', title: 'week_day'},
        {id: 'holiday', title: 'holiday'},
        {id: 'day_of_month', title: 'day_of_month'},
        {id: 'result', title: 'result'},
        {id: 'price', title: 'price'},
      ]
    });

    const holidayService = new HolidayService();

    await holidayService.loadGovHolidays();
    holidayService.setPersonalHolidays(previousHolidays);

    const normalisedTransactions = normaliseTransactions(transactions);
    const transactionsByMerchant = groupTransactionsByMerchant(
      normalisedTransactions
    );

    const trainingTransactions =
      transactionsByMerchant["TFL TRAVEL CH Transport for London"];
    //TFL TRAVEL CH Transport for London
    //Netflix

    const csv = getCSVTrainingSet(trainingTransactions, holidayService);

    await csvWriter.writeRecords(csv)

  });
});
