import { redirect } from "@sveltejs/kit"

export async function load({ cookies, params }) {
	console.log('load turmas/id')
	console.log(params.id)
	redirect(307, `/${cookies.get('perfil')}/turmas/` + params.id + "/atividades")
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
