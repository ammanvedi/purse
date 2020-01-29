import { HolidayService } from "../holidays/HolidayService";
import { DayFeatures } from "../../types/Feature";
import { Tensor } from "@tensorflow/tfjs-core";
import * as tf from "@tensorflow/tfjs-node";
import { getOneHotArray } from "./helpers";

export const getFeaturesForDay = (
  date: string, // YYYY-MM-DD or ISO
  holidayService: HolidayService
): DayFeatures => {
  const asDate = new Date(date);

  return {
    dayOfMonth: asDate.getDate(),
    dayOfWeek: asDate.getDay(),
    isHoliday: holidayService.isHoliday(date)
  };
};

const HOLS_VAL_ONE_HOT_LENGTH = 1;
const DAYS_OF_WEEK_ONE_HOT_LENGTH = 7;
const DAYS_OF_MONTH_ONE_HOT_LENGTH = 31;

export const INPUT_TENSOR_LENGTH =
  HOLS_VAL_ONE_HOT_LENGTH +
  DAYS_OF_WEEK_ONE_HOT_LENGTH +
  DAYS_OF_MONTH_ONE_HOT_LENGTH;

export const featuresToTensor = (features: DayFeatures): Tensor => {
  const isHolVal = [features.isHoliday ? 1 : 0];
  const dayOfWeek = getOneHotArray(
    features.dayOfWeek + 1,
    DAYS_OF_WEEK_ONE_HOT_LENGTH
  );
  const dayOfMonth = getOneHotArray(
    features.dayOfMonth,
    DAYS_OF_MONTH_ONE_HOT_LENGTH
  );

  const t = tf.tensor1d([...isHolVal, ...dayOfWeek, ...dayOfMonth]);
  return t;

  // const t = tf.tensor([
  //     features.isHoliday ? 1 : 0,
  //     features.dayOfWeek,
  //     features.dayOfMonth,
  // ], [3, 1]);
  // t.print(true)
  // return t
};
