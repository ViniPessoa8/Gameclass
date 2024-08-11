import { json } from "@sveltejs/kit";
import { loginUser } from "$controllers/auth";

/* Realiza login do usuário
 *
 * @param {string} login - Nome do usuário a ser logado.
 * @param {string} password - Senha do usuário
 */
export async function POST(event) {

	console.log("POST database/login/ ")
	const data = await event.request.json()

	if (!data.login || !data.password) {
		return json("Missing login or password.")
	}

	let dbConn = event.locals.db_conn
	const loginRes = await loginUser(dbConn, data.login, data.password)

	let res = "";
	if (loginRes) {
		res = json("Login realizado com sucesso")
	} else {
		res = json("Login incorreto")
	}

	return res;
}
