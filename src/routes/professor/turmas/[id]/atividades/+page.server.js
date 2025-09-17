import ItemAtividadeController from "$lib/server/controllers/itemAtividade"
import AtividadeController from "$lib/server/controllers/atividade"
import ConfigController from "$lib/server/controllers/config"
import { CONFIG } from "$lib/constants"

const atividadeController = new AtividadeController()
const itemAtividadeController = new ItemAtividadeController()
const configController = new ConfigController()

export async function load({ params, cookies }) {
	cookies.set("atividade", "", { path: "/" })
	cookies.set("etapas", "", { path: "/" })

	let data = {}

	let atividades = await atividadeController.listaPorIdTurma(params.id)
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
		let itensAtividade = await itemAtividadeController.listaPorIdAtividade(atividades[i].id)

		for (const item of itensAtividade) {
			item.avaliacoesPendentes = parseInt(await itemAtividadeController.possuiAvaliacoesPendentes(item.id))
		}

		atividades[i].itens_atividade = itensAtividade
	}

	data["atividades"] = atividades.map((a) => a.toObject())
	data["perfil"] = perfil

	data.config = {}
	data.config.max_etapas = await configController.carregaConfig(CONFIG.max_etapas)

	return data
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
