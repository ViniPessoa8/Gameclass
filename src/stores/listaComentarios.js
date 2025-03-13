import { writable } from 'svelte/store';
import { onMount } from 'svelte';

// Store reativo para os comentários
export const comentarios = writable([]);

// Função para buscar os comentários do backend
export async function fetchComentarios(idEntrega) {
	if (!idEntrega) return;

	const res = await fetch('/api/database/comentario', {
		method: 'POST',
		body: JSON.stringify({ idEntrega }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// listaComentariosPorIdEntrega(idEntrega)
	const data = await res.json();
	comentarios.set(data);
}

