import getConnection from "../config/database";
import { DB_INFO } from "../lib/constants";

export async function register(login, hash, salt) {
    const db = getConnection()
    const query = {
        text: "INSERT INTO $1(login, hash, salt) VALUES ($2, $3, $4)",
        values: [DB_INFO.auth_table, login, hash, salt]
    }

    let res = await db.query(query)
    console.log(res.rows[0])

    db.end()
}

export function login(login, password) {
    const db = getConnection()
    db.end()
}