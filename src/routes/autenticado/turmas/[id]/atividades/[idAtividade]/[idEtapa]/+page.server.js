
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
	const session_raw = cookies.get("session");
	if (!session_raw) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}
	const data = JSON.parse(session_raw);

	return data
}
