export type AccountHolder = {
    id?: number,
    username: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    accessToken: string,
}

export type AccountTransaction = {
    id?: string,
    amount: number,
    utcTimestamp: number,
    isoCurrency: string | null,
    name: string | null,
    category: string | null,
    pending: 0 | 1,
    bankAccountId: string,
    pendingTransactionId?: string | null,
    transferTransactionId?: string | null,
}

export type BankAccount = {
    id?: string,
    balanceCurrent: number,
    balanceAvailable: number,
    accountName: string,
    accountType: string,
    isoCurrency: string,
    accountHolderId: number
}

export type Category = {
    id: string,
    description: string,
}

export type ExpenseUpdateProperties =
    | 'frequencyType'
    | 'name'
    | 'description'
    | 'id'
    | 'frequencyDate'
    | 'priceBoundLower'
    | 'priceBoundUpper'
    | 'paused'

export type Expense = {
    id?: number,
    frequencyType: number,
    frequencyDate?: number,
    name: string,
    description: string,
    utcTimestampCreated: number,
    priceBoundLower: number,
    priceBoundUpper: number,
    paused: number,
}

export type ExpenseTransaction = {
    expenseId: number,
    transactionId: string,
}