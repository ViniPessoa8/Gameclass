import { cadastraTag } from "$lib/server/controllers/tag"
import { error, fail, redirect } from "@sveltejs/kit"
import TurmaController from "$lib/server/controllers/turma"
import AtividadeController from "$lib/server/controllers/atividade"

const turmaController = new TurmaController()
const atividadeController = new AtividadeController()

export async function load({ params }) {
	const turmaId = params.id
	const turma = await turmaController.buscarPorId(turmaId)

	console.assert(turma != null, `Turma ${turmaId} não encontrada.`)

	return { "nomeTurma": turma.nome }
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

		// Salva tags do usuário
		// TODO: Verificar se tag ja existe antes de salvar
		for (const [key, value] of Object.entries(tags)) {
			let tituloTag = key
			let corTag = value
			let erro
			try {
				await cadastraTag(tituloTag, corTag, idProfessor)
			} catch (e) {
				erro = e
			}
			if (erro) fail(400, `POST /atividades/create ERROR: ${erro}`)
		}

		// Cria atividade
		let idAtividade;
		let erro;
		try {
			const idAtividadeRes = await atividadeController.cadastrar({ titulo: tituloAtividade, descricao: descricaoAtividade, prazo: prazoAtividade, id_turma: idTurma })

			idAtividade = idAtividadeRes.id
		} catch (e) {
			erro = e
		}

		if (erro) {
			console.error(erro)
			if (erro.message.includes("Uma atividade com o mesmo nome já existe nessa turma")) {
				return fail(400, { duplicated: true, e: erro.message })

			} else {
				error(400, `POST /atividades/create ERROR: ${erro}`)
			}
		}

		cookies.set("toast", 'atividade_criada', { path: "/" })
		redirect(307, request.url + '/etapas/' + idAtividade)

	}

}
