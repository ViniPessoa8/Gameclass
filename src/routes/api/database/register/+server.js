/** 
 *	Cadastra um novo usuário no banco de dados
 *	@param {string} nome
 *	@param {string} login
 *	@param {string} password
 * */

import { error } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";

/* Cadastra um novo usuário no banco de dados.
 *
 * @param {string} login - Nome do perfil do usuário.
 * @param {string} password - Senha do usuário.
 * @param {string} nome - Nome real do usuário.
 */
export async function POST(event) {

	console.log(event.request.method + " /" + event.request.url + " ")
	const data = await event.request.json()

	if (!data.login || !data.password || !data.nome) {
		console.log("\t", 400, "Missing data.")
		error(400, "Missing Data")
	}

	let dbConn = event.locals.db_conn;
	let registered = await registerNewUser(dbConn, data.nome, data.login, data.password);

	if (!registered) {
		console.log("\t", 500, "Erro no registro do usuário")
		error(500, "Erro no registro do usuário")
	}

	console.log("\t", 200, "Usuário registrado com sucesso")

	return new Response("Usuário registrado com sucesso")
}
