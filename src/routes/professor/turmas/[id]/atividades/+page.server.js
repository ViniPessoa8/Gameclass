import ItemAtividadeController from "$lib/server/controllers/itemAtividade"
import AtividadeController from "$lib/server/controllers/atividade"

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()

export async function load({ params, cookies }) {
	let data = {}
	let atividades = await atividadeController.listarPorIdTurma(params.id)

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
		let itensAtividade = await itemAtividadeController.listaItensDaAtividadePorId(atividades[i].id)
		console.debug(`atividades[${i}].itensAtividade: `, itensAtividade)
		atividades[i].itens_atividade = itensAtividade
	}

	data["atividades"] = atividades.map((a) => a.toObject())
	data["perfil"] = perfil

	console.debug("data: ", data)
	return data
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
