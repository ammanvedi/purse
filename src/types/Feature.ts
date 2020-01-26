export enum DayOfWeek {
    SUN,
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
}

export type DayFeatures = {
    dayOfMonth: number,
    dayOfWeek: DayOfWeek,
    isHoliday: boolean,
}