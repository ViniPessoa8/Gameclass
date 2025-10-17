import { fail } from '@sveltejs/kit';
import MuralController from '$lib/server/controllers/mural';
import ComentarioController from '$lib/server/controllers/comentario';
import { info, log } from "$lib/utils/logger"

const muralController = new MuralController()
const comentarioController = new ComentarioController()

export const actions = {
	novaPublicacao: async ({ cookies, request, params }) => {
		info(`Criando nova publicação no mural da turma ${params.id}`)

		const data = await request.formData();
		const cookiesDict = JSON.parse(cookies.get("session"))
		const idUsuario = cookiesDict.id;
		const idTurma = params.id
		const textPublicacao = data.get('textoPublicacao')
		let anexos = data.getAll("inputFiles")
		if (anexos && anexos[0].size == 0) anexos = []

		let idPublicacao;
		idPublicacao = await muralController.criaPublicacao(idTurma, idUsuario, textPublicacao, anexos)

		cookies.set("toast", 'publicacao_criada', { path: "/" })
		return true
	},
	novoComentario: async ({ cookies, request, params }) => {

		const data = await request.formData();
		const textoComentario = data.get('textoComentario')
		const idPublicacao = data.get('idPublicacao')
		const cookiesDict = JSON.parse(cookies.get("session"))
		const idUsuario = cookiesDict.id;
		const dataAtual = new Date();
		const formatter = new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
		const dataFormatada = formatter.format(dataAtual);

		info(`Criando novo comentário "${textoComentario}" na publicação (${idPublicacao}) da turma ${params.id}`)

		try {
			await comentarioController.comentaPublicacao(idUsuario, idPublicacao, textoComentario, dataFormatada)
		} catch (e) {
			console.error("DEU ERRO", e)
			return fail("Erro", "Erro ao criar comentário")
		}

		return true
	}
}
