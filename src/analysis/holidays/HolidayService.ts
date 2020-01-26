import request from "request-promise-native";
import { getHolidayFromGovHoliday, getHolidayMap } from "./helpers";
import { DayOfWeek } from "../../types/Feature";
import {
  Holiday,
  HolidayMap,
  HolidayRegion,
  HolidayType
} from "../../types/Holiday";

export class HolidayService {
  protected static ENDPOINT = "https://www.gov.uk/bank-holidays.json";
  protected static REGION = HolidayRegion.EnglandWales;

  protected govHolidays: HolidayMap | null = null;
  protected personalHolidays: HolidayMap | null = null;

  async loadGovHolidays() {
    try {
      const response = JSON.parse(await request(HolidayService.ENDPOINT));

      const { events } = response[HolidayService.REGION];
      const holidays = events.map(getHolidayFromGovHoliday);
      this.govHolidays = getHolidayMap(holidays);
    } catch {
      console.log("Failed fetching holidays");
    }
  }

  setPersonalHolidays(dates: Array<string>): void {
    const holidays = dates.map<Holiday>(date => ({
      date,
      type: HolidayType.ANNUAL_LEAVE,
      name: "Annual Leave"
    }));
    this.personalHolidays = getHolidayMap(holidays);
  }

  isHoliday(date: string) {
    if (!this.personalHolidays || !this.govHolidays) {
      throw new Error(
        "Tried to determine holiday before data provided / loaded"
      );
    }

    // First we can easily determine if this is a saturday or sunday
    const weekDay = new Date(date).getDay();
    if (weekDay === DayOfWeek.SAT || weekDay === DayOfWeek.SUN) {
      return true;
    }

    // otherwise we check if it is a national or annual leave holiday
    return !!this.govHolidays[date] || !!this.personalHolidays[date];
  }
}
