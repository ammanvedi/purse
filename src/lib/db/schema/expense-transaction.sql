CREATE TABLE IF NOT EXISTS expenseTransaction(
    expenseId INTEGER NOT NULL,
    transactionId TEXT NOT NULL,
    PRIMARY KEY (expenseId, transactionId),
    FOREIGN KEY (expenseId)
        REFERENCES expense (id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (transactionId)
        REFERENCES accountTransactions (id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
)