import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	try {
		const { key, value } = await request.json();

		if (!key || !value) {
			return json({ message: 'A chave (key) e o valor (value) são obrigatórios.' }, { status: 400 });
		}

		// Lista de chaves permitidas para segurança
		const allowedKeys = ['visualizacao_entregas', 'turmas_view_preference'];
		if (!allowedKeys.includes(key)) {
			return json({ message: 'Chave de preferência não permitida.' }, { status: 403 });
		}

		cookies.set(key, value, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365,
			httpOnly: true,
			sameSite: 'lax'
		});

		return json({ message: `Cookie '${key}' salvo com sucesso.` });

	} catch (error) {
		console.error('Erro ao salvar o cookie:', error);
		return json({ message: 'Erro interno do servidor' }, { status: 500 });
	}
}
