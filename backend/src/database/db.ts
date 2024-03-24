import { Pool } from "pg"

const user = process.env.DB_USER
const password = process.env.DB_PASS
const host = process.env.DB_HOST
const port = parseInt(process.env.DB_PORT!)
const database = process.env.DB_NAME

//Use .env variables here
export const pool = new Pool({
    user,
    password,
    host,
    port,
    database
})
