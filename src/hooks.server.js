/** @type {import('@sveltejs/kit').Handle} */
import { db_conn } from "$config/database.js"

export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('/custom')) {
		return new Response('custom response');
	}

	console.log(typeof db_conn);

	event.locals = {
		db_conn: db_conn
	};

	const response = await resolve(event);
	return response;
}
