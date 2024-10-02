import { getTurmaById } from "$lib/server/controllers/turma"
import { cadastraTag } from "$lib/server/controllers/tag"
import { error } from "@sveltejs/kit"
import { cadastraAtividade } from "$lib/server/controllers/atividade"
import { listaTagsProfessor } from "$lib/server/controllers/tag"

let turmaId
let userId
export async function load({ cookies, params }) {
	turmaId = params.id
	userId = JSON.parse(cookies.get('session'))
	userId = userId.id
	console.log("atividades/create/server userId: " + userId)
	console.log("atividades/create/server turmaId: " + turmaId)
	const turma = await getTurmaById(turmaId)
	console.log("atividades/create/server nomeTurma: " + turma.nome)
	let tags = await listaTagsProfessor(userId)
	console.log("atividades/create/server tags: " + tags)

	return { "nomeTurma": turma.nome, tags: tags }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		let tituloAtividade = data.get('titulo')
		let descricaoAtividade = data.get('descricao')
		let prazoAtividade = data.get('prazo')
		let tags = JSON.parse(data.get("tags"))
		salvaTagsUsuario(tags);

		let res;
		try {
			res = await cadastraAtividade(tituloAtividade, descricaoAtividade, prazoAtividade, turmaId)
		} catch (e) {
			console.error(e)
			error(e)
		}
		let idAtividadeCriada = res[0].id
		console.log("Atividade criada: ", idAtividadeCriada)
	}
}

async function salvaTagsUsuario(tags) {
	for (const [key, value] of Object.entries(tags)) {
		let tituloTag = key
		let corTag = value
		try {
			await cadastraTag(tituloTag, corTag, userId)
		} catch (e) {
			console.log("POST /atividades/create ERROR: ", e)
		}
	}

}
