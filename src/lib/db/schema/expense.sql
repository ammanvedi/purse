CREATE TABLE IF NOT EXISTS expense(
    paused INTEGER NOT NULL,
    id INTEGER PRIMARY KEY,
    frequencyType TEXT NOT NULL,
    frequencyDate INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    utcTimestampCreated INTEGER NOT NULL,
    priceBoundLower FLOAT NOT NULL,
    priceBoundUpper FLOAT NOT NULL
)