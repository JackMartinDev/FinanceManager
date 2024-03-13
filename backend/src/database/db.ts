import { Pool } from "pg"

//Use .env variables here
export const pool = new Pool({
    user: "postgres",
    password: "pass",
    host: "localhost",
    port: 5432,
    database: "postgres"
})
