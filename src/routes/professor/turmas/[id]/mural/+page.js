import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const res = await fetch('mural/data');
	if (!res.ok) {
		throw error(res.status, 'Falha ao carregar publicações');
	}
	const { publicacoes } = await res.json();
	return { publicacoes };
}
