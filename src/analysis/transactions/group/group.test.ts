import {groupTransactionsByMerchant} from "./group";
import {testTransactions} from "./fixtures";

describe('group', () => {


    it ('groups transactions properly', () => {
        const res = groupTransactionsByMerchant(testTransactions);
        expect(res).toMatchObject({
            a: [
                {
                    merchant: 'a',
                    id: 1
                },
                {
                    merchant: 'a',
                    id: 4
                }
            ],
            b: [
                {
                    merchant: 'b',
                    id: 5
                }
            ],
            c: [
                {
                    merchant: 'c',
                    id: 2
                },
                {
                    merchant: 'c',
                    id: 3
                },
            ]
        })
    })
})