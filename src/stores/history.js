import { writable } from 'svelte/store';

/**
 * Armazena uma pilha (array) de URLs visitadas dentro do app.
 * A página mais recente está no final do array.
 */
export const historyStack = writable([]);
