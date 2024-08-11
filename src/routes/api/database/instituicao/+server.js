import { getInstituicoes } from "$controllers/instituicao";

/** 
 * Lista todas as instituições cadastradas no banco de dados
 *
 * @param {pg.Connection} db_conn - Conexão do banco de dados. 
 */
export async function GET(event) {
	let dbConn = event.locals.db_conn;
	let res = await getInstituicoes(dbConn);
	return new Response(JSON.stringify(res))
}
