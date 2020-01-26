import {iterateDateRange, toYMDString} from "./helpers";

describe('Helpers', () => {
    describe('iterateDateRange', () => {
        it('iterates the correct number of times', () => {
            const cb = jest.fn();
            iterateDateRange('2019-12-25', '2020-01-01', cb);
            expect(cb).toHaveBeenCalledTimes(7);
        })
    });

    describe('toYMDString', () => {
        it('converts the string correctly', () => {
            const res = toYMDString(new Date(2015, 0, 29));
            expect(res).toBe('2015-01-29')
        })
    })
});