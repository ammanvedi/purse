import {HolidayService} from "../holidays/HolidayService";
import {DayFeatures} from "../../types/Feature";
import { Tensor } from '@tensorflow/tfjs-core';
import * as tf from '@tensorflow/tfjs-node';


export const getFeaturesForDay = (
    date: string, // YYYY-MM-DD or ISO
    holidayService: HolidayService,
): DayFeatures => {
    const asDate = new Date(date);

    return {
        dayOfMonth: asDate.getDate(),
        dayOfWeek: asDate.getDay(),
        isHoliday: holidayService.isHoliday(date),
    }
};

export const featuresToTensor = (features: DayFeatures): Tensor => {
    const t = tf.tensor([
        features.isHoliday ? 1 : 0,
        features.dayOfWeek,
        features.dayOfMonth,
    ], [3]);
    t.print(true)
    return t

};