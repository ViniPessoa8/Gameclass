import { json } from "@sveltejs/kit";
import { registerNewUser } from "$controllers/auth";
export async function POST(event) {

	process.stdout.write("POST database/register/ ")
	process.stdout.write(event.request, typeof event.request)
	const data = await event.request.json()

	if (!data.login || !data.password || !data.name) {
		console.log("Missing data.")
		return json("Missing data.")
	}

	let dbConn = event.locals.db_conn
	const registered = await registerNewUser(dbConn, data.name, data.login, data.password)

	if (!registered)
		return json("Erro no registro do usuário")

	const res = json("Usuário registrado sucesso.")
	return res;
}
