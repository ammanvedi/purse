CREATE TABLE IF NOT EXISTS expense(
    id INTEGER PRIMARY KEY,
    frequencyType INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    utcTimestampCreated INTEGER NOT NULL
)