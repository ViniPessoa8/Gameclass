import { getTurmaById } from "$lib/server/controllers/turma"
import { cadastraTag } from "$lib/server/controllers/tag"
import { error, fail, redirect } from "@sveltejs/kit"
import { cadastraAtividade } from "$lib/server/controllers/atividade"

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
				console.log("POST /atividades/create ERROR: ", e)
			}
			console.debug("erro: ", erro)
			if (erro) fail(400, `POST /atividades/create ERROR: ${erro}`)
		}

		// Cria atividade
		let idAtividade;
		let erro;
		try {
			idAtividade = await cadastraAtividade(tituloAtividade, descricaoAtividade, prazoAtividade, idProfessor)
			idAtividade = idAtividade[0].id
		} catch (e) {
			erro = e
		}

		if (erro) {
			// TODO: Fazer essa checagem funcionar
			console.debug(erro)
			if (erro.message.includes("Uma atividade com o mesmo nome já existe nessa turma")) {
				return fail(400, { duplicated: true, e: erro.message })

			} else {
				error(400, `POST /atividades/create ERROR: ${erro}`)
			}
		}

		console.log("URL: ", request.url)
		redirect(307, request.url + '/etapas/' + idAtividade)

	}

}
