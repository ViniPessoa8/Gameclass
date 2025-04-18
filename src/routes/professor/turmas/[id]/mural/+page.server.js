import { getPublicacoesByIdTurma } from "$lib/server/controllers/mural"
import { listaComentariosPorIdPublicacaoMural } from "$lib/server/controllers/comentario"

export async function load({ params, cookies }) {
	let data = {}
	let publicacoes = await getPublicacoesByIdTurma(params.id)

	console.debug("publicacaoes:", publicacoes)

	const perfil = cookies.get("perfil")
	const toast = cookies.get("toast")
	if (toast) {
		data["toast"] = toast
		cookies.set("toast", "", { path: "/" })
	}

	if (publicacoes && publicacoes.length == 0) {
		return { publicacoes: [], perfil: perfil }
	}

	for (let i = 0; i <= publicacoes.length - 1; i += 1) {
		let comentarios = await listaComentariosPorIdPublicacaoMural(publicacoes[i].id)
		publicacoes[i].comentarios = comentarios
	}

	data["publicacoes"] = publicacoes
	data["perfil"] = perfil

	return data
}

export const actions = {
	default: async () => {
		console.log("get turma by id")
	}
}
