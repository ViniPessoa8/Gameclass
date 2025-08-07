import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	try {
		const { newView } = await request.json();

		if (!newView) {
			return json({ message: 'Valor não fornecido' }, { status: 400 });
		}

		// Define o cookie com o novo valor
		cookies.set('visualizacao_entregas', newView, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7 // 7 dias
		});

		return json({ message: 'Cookie salvo com sucesso' });

	} catch (error) {
		console.error('Erro ao salvar o cookie:', error);
		return json({ message: 'Erro interno do servidor' }, { status: 500 });
	}
}
