import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

async function getConnection() {
  const { Client } = pg
  const client = new Client({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  }) 
 
  try {
    await client.connect()
    return client
  } catch (err) {
    console.log(err)
  }
}

export default getConnection;
