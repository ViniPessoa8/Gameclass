import { json, error } from '@sveltejs/kit';
import AtividadeController from '$lib/server/controllers/atividade.js';

const atividadeController = new AtividadeController();

export async function GET({ url }) {
	const titulo = url.searchParams.get('titulo');
	const id_turma = url.searchParams.get('id_turma');

	if (!titulo || !id_turma) {
		throw error(400, 'Parâmetros "titulo" e "id_turma" são obrigatórios.');
	}

	try {
		const atividadeExistente = await atividadeController.buscaPorTitulo(titulo, id_turma);

		return json({
			exists: atividadeExistente !== null
		});
	} catch (e) {
		console.error(e);
		throw error(500, 'Erro interno ao verificar o título da atividade.');
	}
}
