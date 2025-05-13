import { writable } from 'svelte/store';

import { browser } from '$app/environment';

const initial = browser
	? JSON.parse(sessionStorage.getItem('etapas') || '[]')
	: [];

export const etapas = writable(initial);

// Só salva no sessionStorage se estiver no navegador
if (browser) {
	etapas.subscribe((value) => {
		sessionStorage.setItem('etapas', JSON.stringify(value));
	});
}
