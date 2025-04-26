import { json, error } from '@sveltejs/kit';
import { getPublicacoesByIdTurma } from '$lib/server/controllers/mural';
import { listaComentariosPorIdPublicacaoMural } from '$lib/server/controllers/comentario';
import { listaAnexosPorIdPublicacaoMural } from '../../../../../../lib/server/controllers/anexo';

export async function GET({ params }) {
	try {
		const publicacoes = await getPublicacoesByIdTurma(params.id);
		for (const pub of publicacoes) {
			pub.comentarios = await listaComentariosPorIdPublicacaoMural(pub.id);
			pub.anexos = await listaAnexosPorIdPublicacaoMural(pub.id)
		}
		return json({ publicacoes });
	} catch (e) {
		console.error('Erro ao buscar publicações:', e);
		throw error(500, 'Falha ao carregar publicações');
	}
}
