import { fail, redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
	const session = cookies.get("session");
	console.log(session)

	if (!cookies.get("session")) {
		console.log("Usuário não autenticado")
		redirect(300, "/")
	} else {
		console.log("escolha_perfil/+page.js | ", session)
		console.log("escolha_perfil/+page.js | ", JSON.parse(session))
	}
}
