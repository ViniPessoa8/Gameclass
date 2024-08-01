import { getInstituicoes } from "$controllers/instituicao";

export async function GET(event) {
	let dbConn = event.locals.db_conn;
	let res = await getInstituicoes(dbConn);
	return new Response(JSON.stringify(res))
}
