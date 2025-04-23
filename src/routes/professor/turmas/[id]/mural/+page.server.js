import { criaPublicacao } from "$lib/server/controllers/mural"

export const actions = {
	novaPublicacao: async ({ cookies, request, params }) => {
		console.log("novaPublicacao")
		const data = await request.formData();
		const cookiesDict = JSON.parse(cookies.get("session"))
		const idUsuario = cookiesDict.id;
		const idTurma = params.id
		const textPublicacao = data.get('textoPublicacao')

		let idPublicacao;
		idPublicacao = await criaPublicacao(idTurma, idUsuario, textPublicacao)
		console.debug(idPublicacao)

		cookies.set("toast", 'publicacao_criada', { path: "/" })
		return true
	}
}
