import { cadastraTag } from "$lib/server/controllers/tag"
import { error, fail, redirect } from "@sveltejs/kit"
import TurmaController from "$lib/server/controllers/turma"
import AtividadeController from "$lib/server/controllers/atividade"
import Atividade from "$lib/models/Atividade"

const turmaController = new TurmaController()
// const atividadeController = new AtividadeController()

export async function load({ params, cookies }) {
	let returnData = {}

	const turmaId = params.id
	const turma = await turmaController.buscaPorId(turmaId)
	console.assert(turma != null, `Turma ${turmaId} não encontrada.`)
	returnData.nomeTurma = turma.nome

	let atividade = cookies.get("atividade")
	if (atividade) {
		atividade = JSON.parse(atividade)
		returnData.atividade = atividade
	}

	return returnData
}

export const actions = {
	default: async ({ cookies, request, params }) => {
		const data = await request.formData();
		const cookiesDict = JSON.parse(cookies.get("session"))

		const idProfessor = cookiesDict.id;
		const idTurma = params.id

		let tituloAtividade = data.get('titulo')
		let descricaoAtividade = data.get('descricao')
		let prazoAtividade = data.get('prazo')
		let tags = JSON.parse(data.get("tags"))

		// // Salva tags do usuário
		// // TODO Verificar se tag ja existe antes de salvar
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

		// Cria atividade
		// TODO: Invés de cadastrar, salvar no objeto no sessionStorage

		// let idAtividade;
		// let erro;
		// try {
		const atividade = new Atividade({
			titulo: tituloAtividade,
			descricao: descricaoAtividade,
			prazo: prazoAtividade,
			id_turma: idTurma
		});

		cookies.set("atividade", JSON.stringify(atividade.toObject()), { path: '/' })

		// const idAtividadeRes = await atividadeController.cadastra(atividade)

		// idAtividade = idAtividadeRes.id
		// } catch (e) {
		// 	erro = e
		// }

		// if (erro) {
		// 	console.error(erro)
		// 	if (erro.hasOwnProperty("message") && erro.message.includes("Uma atividade com o mesmo nome já existe nessa turma")) {
		// 		return fail(400, { duplicated: true, e: erro.message })
		//
		// 	} else {
		// 		error(400, `POST /atividades/create ERROR: ${erro}`)
		// 	}
		// }

		redirect(307, request.url + '/etapas/')

	}

}
