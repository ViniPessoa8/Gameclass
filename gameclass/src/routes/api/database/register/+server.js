import { json } from "@sveltejs/kit";
import { registerNewUser } from "../../../../controllers/auth";
export async function POST(event) {

	process.stdout.write("POST database/register/ ")
	const data = await event.request.json()

	if (!data.login || !data.password) {
		console.log("Missing login or password.")
		return json("Missing login or password.")
	}

	let dbConn = event.locals.db_conn
	const registered = await registerNewUser(dbConn, data.login, data.password)

	if (!registered)
		return json("Erro no registro do usuário")

	const res = json("Usuário registrado sucesso.")
	return res;
}
