import {HolidayService} from "./HolidayService";
import {previousHolidays} from "./fixtures";

describe('HolidayService', () => {

    const instance = new HolidayService();
    instance.setPersonalHolidays(previousHolidays);

    it('loads holidays from gov website', async () => {
        try {
            await instance.loadGovHolidays();
        } catch {
            expect(true).toBe(false);
        }
    });

    it('identifies bank holiday correctly', () => {
        const res = instance.isHoliday('2019-08-26');
        expect(res).toBe(true);
    });

    it('identifies annual leave correctly', () => {
        const res = instance.isHoliday('2019-07-04');
        expect(res).toBe(true);
    });

    it ('identifies non holiday', () => {
        const res = instance.isHoliday('2019-07-05');
        expect(res).toBe(false);
    });

    it ('identifies saturday holiday', () => {
        const res = instance.isHoliday('2019-11-17');
        expect(res).toBe(true);
    });

    it ('identifies sunday holiday', () => {
        const res = instance.isHoliday('2019-08-18');
        expect(res).toBe(true);
    });

});