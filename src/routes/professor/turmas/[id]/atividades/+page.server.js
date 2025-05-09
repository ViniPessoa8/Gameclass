import { getAtividadeById } from "$lib/server/controllers/atividade"
import { getAtividadesByIdTurma } from "$lib/server/controllers/atividade"
import { listaItensDaAtividadePorId } from "$lib/server/controllers/itemAtividade"

export async function load({ params, cookies }) {
	let data = {}
	let atividades = await getAtividadesByIdTurma(params.id)
	const perfil = cookies.get("perfil")
	const toast = cookies.get("toast")
	if (toast) {
		data["toast"] = toast
		cookies.set("toast", "", { path: "/" })
	}

	if (atividades && atividades.length == 0) {
		return { atividades: [], perfil: perfil }
	}

	for (let i = 0; i <= atividades.length - 1; i += 1) {
		let itensAtividade = await listaItensDaAtividadePorId(atividades[i].id)
		atividades[i].itens_atividade = itensAtividade
	}

	data["atividades"] = atividades
	data["perfil"] = perfil
	return data
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
