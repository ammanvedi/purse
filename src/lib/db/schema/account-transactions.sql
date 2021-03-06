CREATE TABLE IF NOT EXISTS accountTransactions(
  id TEXT PRIMARY KEY,
  amount REAL NOT NULL,
  utcTimestamp INTEGER NOT NULL,
  isoCurrency TEXT,
  name TEXT,
  category TEXT,
  pending INTEGER NOT NULL,
  bankAccountId TEXT NOT NULL,
  pendingTransactionId TEXT,
  transferTransactionId TEXT,
  FOREIGN KEY (bankAccountId)
      REFERENCES bankAccount (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
  FOREIGN KEY (category)
      REFERENCES category (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION,
  FOREIGN KEY (pendingTransactionId)
      REFERENCES accountTransactions (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION,
  FOREIGN KEY (transferTransactionId)
      REFERENCES accountTransactions (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION
);