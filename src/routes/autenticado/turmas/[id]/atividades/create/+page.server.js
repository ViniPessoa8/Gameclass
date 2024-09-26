import { getTurmaById } from "$lib/server/controllers/turma"
import { cadastraTag } from "$lib/server/controllers/tag"
import { error } from "@sveltejs/kit"

export async function load({ params }) {
	const turmaId = params.id
	console.log("atividades/create/server turmaId: " + turmaId)
	const turma = await getTurmaById(turmaId)
	console.log("atividades/create/server nomeTurma: " + turma.nome)

	return { "nomeTurma": turma.nome }
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const cookiesDict = JSON.parse(cookies.get("session"))

		let idProfessor = cookiesDict.id;

		let tituloAtividade = data.get('titulo')
		let descricaoAtividade = data.get('descricao')
		let prazoAtividade = data.get('prazo')
		let tags = JSON.parse(data.get("tags"))
		let atribuicaoDeNotasAtividade = data.get('atribuicaoDeNotas')
		let realizacao = data.get('realizacao')

		// Salva tags do usuário
		for (const [key, value] of Object.entries(tags)) {
			let tituloTag = key
			let corTag = value
			try {
				await cadastraTag(tituloTag, corTag, idProfessor)
			} catch (e) {
				console.log("POST /atividades/create ERROR: ", e)
			}
		}

		// Cria atividade
		// TODO: PAREI AQUI, FINALIZAR CRIAÇÃO DA ATIVIDADE


	}

}
