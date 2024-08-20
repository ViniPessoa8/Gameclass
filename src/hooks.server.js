/** @type {import('@sveltejs/kit').Handle} */
import { db_conn } from "$config/database.js"


export async function handle({ event, resolve }) {

	event.locals.db_conn = db_conn;

	const response = await resolve(event);

	return response;
}
