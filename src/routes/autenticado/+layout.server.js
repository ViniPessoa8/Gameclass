import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
	console.debug("[/AUTENTICADO/LAYOUT/SERVER]")
	const session_raw = cookies.get("session");
	if (!session_raw) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	}
	const perfil_raw = cookies.get("perfil");
	const session = JSON.parse(session_raw);
	session.perfil = perfil_raw

	return session
}
