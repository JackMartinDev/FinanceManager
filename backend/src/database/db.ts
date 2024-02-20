import { Pool } from "pg"

export const pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5433,
    database: "postgres"
})
