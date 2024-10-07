import { getAtividadeById } from "$lib/server/controllers/atividade"
import { getAtividadesByIdTurma } from "$lib/server/controllers/atividade"
import { listaItensDaAtividadePorId } from "../../../../../lib/server/controllers/itemAtividade"

export async function load({ params }) {
	console.log('load turmas/id')

	let atividades = await getAtividadesByIdTurma(params.id)

	for (let i = 0; i < atividades.length; i += 1) {
		let itensAtividade = await listaItensDaAtividadePorId(atividades[i].id)
		atividades[i].itens_atividade = itensAtividade
	}

	return {
		atividades: atividades
	}
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
