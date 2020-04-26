import sql from "sqlite3";

export type ServerContext = {
    db: sql.Database,
    userId
}