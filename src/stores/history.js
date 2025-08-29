import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// A chave que usaremos para salvar os dados no sessionStorage
const STORAGE_KEY = 'sveltekit_navigation_stack';

// 1. Tenta carregar o valor inicial do sessionStorage
//    Esta função só roda no cliente (navegador)
function getInitialValue() {
	if (browser) {
		const storedValue = sessionStorage.getItem(STORAGE_KEY);
		if (storedValue) {
			try {
				// Converte a string JSON de volta para um array
				return JSON.parse(storedValue);
			} catch (e) {
				console.error('Erro ao parsear o histórico do sessionStorage', e);
				return []; // Retorna vazio em caso de erro
			}
		}
	}
	return []; // Valor padrão se não estiver no navegador ou não houver nada salvo
}

// Cria a store com o valor inicial carregado
const initialValue = getInitialValue();
export const historyStack = writable(initialValue);

// 2. Sincroniza a store com o sessionStorage sempre que ela for alterada
//    Este código também só roda no navegador
if (browser) {
	historyStack.subscribe((stack) => {
		// Converte o array para uma string JSON e salva no sessionStorage
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
	});
}
