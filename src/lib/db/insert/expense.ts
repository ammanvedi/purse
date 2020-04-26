import {BankAccount, Expense, ExpenseUpdateProperties} from "../../../types/database";

export const createExpense = (expense: Expense): string => `
    INSERT INTO expense (frequencyType, name, description, utcTimestampCreated, paused, frequencyDate, priceBoundLower, priceBoundUpper)
    VALUES (
            ${expense.frequencyType},
            "${expense.name}",
            "${expense.description}",
            ${Date.now()},
            ${expense.paused},
            ${expense.frequencyDate},
            ${expense.priceBoundLower},
            ${expense.priceBoundUpper},
            )
`;

export const deleteExpense = (id: number): string => `
    DELETE FROM expense
    WHERE id = ${id}
`

export const updateExpense = (expense: Pick<Expense, ExpenseUpdateProperties>): string => `
    UPDATE expense
    SET frequencyType = ${expense.frequencyType},
        name = "${expense.name}",
        description = "${expense.description}",
        frequencyType = "${expense.frequencyType}",
        frequencyDate = ${expense.frequencyDate},
        priceBoundLower = ${expense.priceBoundLower},
        priceBoundUpper = ${expense.priceBoundUpper},
        paused = ${expense.paused}
    WHERE
        id = ${expense.id}
`;

export const addTransactionToExpense = (expenseId: number, transactionId: string): string => `
    INSERT INTO expenseTransaction (expenseId, transactionId)
    VALUES (
            ${expenseId},
            "${transactionId}"
           )
`;

export const deleteTransactionFromExpense = (expenseId: number, transactionId: string): string => `
    DELETE FROM expenseTransaction
    WHERE expenseId = ${expenseId} AND transactionId = "${transactionId}"
`;