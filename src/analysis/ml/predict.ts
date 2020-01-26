import { KNNClassifier } from '@tensorflow-models/knn-classifier';
import {HolidayService} from "../holidays/HolidayService";
import {iterateDateRange, toYMDString} from "../dates/helpers";
import {featuresToTensor, getFeaturesForDay} from "./features";

export const predictForDateRange = async (
    classifier: KNNClassifier,
    holidayService: HolidayService,
    startDate: string,
    endDate: string,
): Promise<Array<String>> => {


    const predictions: Array<Promise<any>> = [];

    iterateDateRange(startDate, endDate, date => {
        const features = getFeaturesForDay(toYMDString(date), holidayService);
        const tensor = featuresToTensor(features);
        predictions.push(classifier.predictClass(tensor, 11));
    });

    const res = await Promise.all(predictions);
    console.log(res);
    return res.map(p => p.label);

};