import pg from 'pg'

async function getConnection() {
	const { Client } = pg
	const client = new Client({
		user: import.meta.env.VITE_DATABASE_USER,
		password: import.meta.env.VITE_DATABASE_PASSWORD,
		host: import.meta.env.VITE_DATABASE_HOST,
		port: import.meta.env.VITE_DATABASE_PORT,
		database: import.meta.env.VITE_DATABASE_NAME,
	})

	try {
		await client.connect()
		console.log("Database connected")
		return client
	} catch (err) {
		console.log(err)
	}
}

export const dbConn = await getConnection();
