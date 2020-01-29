import {NormalisedTransaction} from "../../types/NormalisedTransaction";
import {groupTransactionsByDate} from "../transactions/group/group";
import {iterateDateRange, toYMDString} from "../dates/helpers";
import {featuresToTensor, getFeaturesForDay} from "./features";
import {HolidayService} from "../holidays/HolidayService";

export const getOneHotArray = (value: number, k: number): Array<number> => {
    const vals: Array<number> = [];

    for(let i = 0; i < k; i++) {
        const isVal = i === (value - 1);
        vals[i] = isVal ? 1 : 0;
    }

    return vals;
};

const weekdayMapping = [
    'week_Sun',
    'week_Mon',
    'week_Tue',
    'week_Wed',
    'week_Thu',
    'week_Fri',
    'week_Sat'
]


const daysInMonth = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
]

type CSVObject = {
    week_day: number,
    holiday: number,
    day_of_month: number,
    result: number,
    price: number,
}

export const getCSVTrainingSet = (transactions: Array<NormalisedTransaction>, holidayService: HolidayService): Array<CSVObject> => {
    const firstTransactionDate = transactions[transactions.length - 1].date;
    const lastTransactionDate = transactions[0].date;

    const transactionsByDate = groupTransactionsByDate(transactions);

    const trainingSet: Array<CSVObject> = [];

    iterateDateRange(firstTransactionDate, lastTransactionDate, date => {
        const dateString = toYMDString(date);
        const weekday = date.getDay();
        const monthDay = date.getDate();

        const hadTransactions = transactionsByDate[dateString];

        trainingSet.push({
            week_day: weekday,
            holiday: holidayService.isHoliday(dateString) ? 1 : 0,
            result: hadTransactions ? 1 : 0,
            day_of_month: monthDay,
            price: hadTransactions ? Math.ceil(hadTransactions[0].amount) : 0
        });
    });

    return trainingSet;
}