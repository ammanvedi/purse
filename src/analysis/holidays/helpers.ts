import { HolidayType, Holiday, HolidayMap, GovHoliday } from "../../types/Holiday";

export const getHolidayFromGovHoliday = (govHol: GovHoliday): Holiday => ({
    date: govHol.date,
    name: govHol.title,
    type: HolidayType.BANK_HOLIDAY,
});

export const getHolidayMap = (holidays: Array<Holiday>): HolidayMap => {
    return holidays.reduce<HolidayMap>((map, holiday) => {
        map[holiday.date] = holiday;
        return map;
    }, {})
};