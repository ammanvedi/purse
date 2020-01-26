import { transactions } from "../transactions/normalise/fixtures";
import { groupTransactionsByMerchant } from "../transactions/group/group";
import { normaliseTransactions } from "../transactions/normalise/normalise";
import { createTrainingSetFromTransactions } from "./training-set";
import { HolidayService } from "../holidays/HolidayService";
import { previousHolidays } from "../holidays/fixtures";

import * as knnClassifier from '@tensorflow-models/knn-classifier';
import {featuresToTensor} from "./features";
import {predictForDateRange} from "./predict";



describe("Training Set", () => {
  it("trains model", async () => {
    const holidayService = new HolidayService();

    await holidayService.loadGovHolidays();
    holidayService.setPersonalHolidays(previousHolidays);

    const normalisedTransactions = normaliseTransactions(transactions);
    const transactionsByMerchant = groupTransactionsByMerchant(
      normalisedTransactions
    );

    // const trainingTransactions =
    //   transactionsByMerchant["TFL TRAVEL CH Transport for London"];
    const trainingTransactions =
      transactionsByMerchant["Netflix"];

    const trainingSet = createTrainingSetFromTransactions(
      trainingTransactions,
      holidayService
    );

    // trainingSet.forEach(([t, occ]) => {
    //   t.print()
    //   console.log(occ === 1 ? 'GOT TRAIN' : 'NO TRAIN')
    // })

    // Create the classifier.
    const classifier = knnClassifier.create();

    trainingSet.forEach(([ tensor, classification ]) => {
      classifier.addExample(tensor, classification);
    })

    const res = await predictForDateRange(
        classifier,
        holidayService,
        '2020-01-26',
        '2020-05-28',
    )

    console.log(res);

  });
});
