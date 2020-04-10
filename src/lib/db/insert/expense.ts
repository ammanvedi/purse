import {BankAccount, Expense} from "../../../types/database";

export const createExpense = (expense: Expense): string => `
    INSERT INTO expense (frequencyType, name, description, utcTimestampCreated)
    VALUES (
            ${expense.frequencyType},
            "${expense.name}",
            "${expense.description}",
            ${Date.now()}
            )
`;

export const deleteExpense = (id: number): string => `
    DELETE FROM expense
    WHERE id = ${id}
`

export const updateExpense = (expense: Pick<Expense, 'frequencyType' | 'name' | 'description' | 'id'>): string => `
    UPDATE expense
    SET frequencyType = ${expense.frequencyType},
        name = "${expense.name}",
        description = "${expense.description}"
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