import { redirect } from "@sveltejs/kit"
import { findUserByLogin } from "$lib/server/repositories/auth"

export async function load({ cookies, params }) {
	console.log('load turmas/id')
	console.log(params.id)
	const session_raw = cookies.get("session");
	const session = JSON.parse(session_raw);

	const usuario = findUserByLogin(session.id)

	redirect(307, `/${cookies.get('perfil')}/turmas/` + params.id + "/atividades")

	return { "usuario": usuario }
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
