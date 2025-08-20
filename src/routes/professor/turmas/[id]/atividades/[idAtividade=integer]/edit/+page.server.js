import { cadastraTag } from "$lib/server/controllers/tag"
import { error, fail, redirect } from "@sveltejs/kit"
import TurmaController from "$lib/server/controllers/turma"
import AtividadeController from "$lib/server/controllers/atividade"
import Atividade from "$lib/models/Atividade"

const turmaController = new TurmaController()
const atividadeController = new AtividadeController()

export async function load({ params }) {
	const turmaId = params.id
	const idAtividade = params.idAtividade

	const turma = await turmaController.buscaPorId(turmaId)
	const atividade = (await atividadeController.buscaPorId(idAtividade)).toObject()

	console.assert(turma != null, `Turma ${turmaId} não encontrada.`)

	return { "nomeTurma": turma.nome, "atividade": atividade }
}

export const actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const cookiesDict = JSON.parse(cookies.get("session"))

		// const idProfessor = cookiesDict.id;
		// const idTurma = params.id
		const idAtividade = params.idAtividade

		let tituloAtividade = data.get('titulo')
		let descricaoAtividade = data.get('descricao')
		let prazoAtividade = data.get('prazo')
		// let tags = JSON.parse(data.get("tags"))

		// // Salva tags do usuário
		// // TODO: Verificar se tag ja existe antes de salvar
		// for (const [key, value] of Object.entries(tags)) {
		// 	let tituloTag = key
		// 	let corTag = value
		// 	let erro
		// 	try {
		// 		await cadastraTag(tituloTag, corTag, idProfessor)
		// 	} catch (e) {
		// 		erro = e
		// 	}
		// 	if (erro) fail(400, `POST /atividades/create ERROR: ${erro}`)
		// }

		// Busca atividade
		let erro;
		try {
			const atividade = await atividadeController.buscaPorId(idAtividade)

			atividade.titulo = tituloAtividade
			atividade.descricao = descricaoAtividade
			atividade.prazo = prazoAtividade

			await atividadeController.atualiza(atividade)

		} catch (e) {
			erro = e
		}

		if (erro) {
			console.error(erro)
			if (erro.hasOwnProperty("message") && erro.message.includes("Uma atividade com o mesmo nome já existe nessa turma")) {
				return fail(400, { duplicated: true, e: erro.message })

			} else {
				error(400, `POST /atividades/create ERROR: ${erro}`)
			}
		}

		redirect(307, request.url.split("/").slice(0, -1).join("/"))

	}

}
