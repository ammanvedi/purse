CREATE TABLE IF NOT EXISTS bankAccount(
  id TEXT PRIMARY KEY,
  balanceCurrent REAL NOT NULL,
  balanceAvailable REAL NOT NULL,
  accountName TEXT NOT NULL,
  accountType TEXT NOT NULL,
  isoCurrency TEXT NOT NULL,
  accountHolderId INTEGER NOT NULL,
  FOREIGN KEY (accountHolderId)
      REFERENCES accountHolder (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION
);