import { json, error } from '@sveltejs/kit';
import MuralController from '$lib/server/controllers/mural';
import ComentarioController from '$lib/server/controllers/comentario';
import AnexoController from '$lib/server/controllers/anexo';

const muralController = new MuralController()
const comentarioController = new ComentarioController()
const anexoController = new AnexoController()

export async function GET({ params }) {
	try {
		const publicacoes = await muralController.buscaPorIdTurma(params.id);
		for (const pub of publicacoes) {
			pub.comentarios = await comentarioController.listaPorIdPublicacaoMural(pub.id);
			pub.anexos = await anexoController.listaPorIdPublicacaoMural(pub.id)
		}
		return json({ publicacoes });
	} catch (e) {
		console.error('Erro ao buscar publicações:', e);
		throw error(500, 'Falha ao carregar publicações');
	}
}
