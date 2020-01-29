import {getOneHotArray} from "./helpers";

describe('Helpers', () => {
    describe('getOneHotArray', () => {
        it('gives correct array', () => {
            const res = getOneHotArray(1, 7);
            expect(res).toMatchObject([1, 0, 0, 0, 0, 0, 0])
        })
    })
})