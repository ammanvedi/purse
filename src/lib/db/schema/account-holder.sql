CREATE TABLE IF NOT EXISTS accountHolder(
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    accessToken TEXT NOT NULL
);
