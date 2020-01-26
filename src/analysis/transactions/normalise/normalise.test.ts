import {parseName} from "./normalise";

describe('Normalise', () => {
    describe('parseName', () => {

        it('Adjusts names correctly', () => {
            const testNames = [
                'WORK A T LTD Lifeworks BGC',
                'TFL TRAVEL CH ON 21 JAN CPM Transport for London',
                'APPLE.COM/BILL IRELAND ON 20 JAN BCC APPLE.COM/BILL',
                'Netflix',
                'Tidal Music SWEDEN ON 20 JAN BCC Tidal Music'
            ];
            const res = testNames.map(parseName);
            expect(res).toMatchObject([
                'WORK A T LTD Lifeworks BGC',
                'TFL TRAVEL CH Transport for London',
                'APPLE.COM/BILL IRELAND APPLE.COM/BILL',
                'Netflix',
                'Tidal Music SWEDEN Tidal Music'
            ])
        })
    });
});