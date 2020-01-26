export enum HolidayRegion {
    EnglandWales = 'england-and-wales'
}

export enum HolidayType {
    BANK_HOLIDAY = 'BANK',
    ANNUAL_LEAVE = 'ANNUAL_LEAVE',
    ILLNESS = 'ILLNESS'
}


export type GovHoliday = {
    title: string,
    date: string, // YYYY-MM-DD
    notes?: string,
    bunting?: boolean,
}

export type Holiday = {
    name: string,
    type: HolidayType,
    date: string, // YYYY-MM-DD
}

export type GovHolidayResponse = {
    "england-and-wales": {
        division: HolidayRegion.EnglandWales,
        events: Array<GovHoliday>
    }
}

export type HolidayMap = {
    [key: string]: Holiday,
}
