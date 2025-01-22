import { getAtividadeById } from "$lib/server/controllers/atividade"
import { getAtividadesByIdTurma } from "$lib/server/controllers/atividade"
import { listaItensDaAtividadePorId } from "../../../../../lib/server/controllers/itemAtividade"

export async function load({ params }) {
	let atividades = await getAtividadesByIdTurma(params.id)

	if (atividades && atividades.length == 0) {
		return { atividades: [] }
	}

	for (let i = 0; i <= atividades.length - 1; i += 1) {
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
