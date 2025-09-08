import { writable } from 'svelte/store';

/**
 * @type {import('svelte/store').Writable<(() => Promise<boolean>) | null>}
 * Esta store armazena uma "função de guarda".
 * Se a função existir, o componente de navegação (ex: Botão Voltar)
 * deve chamá-la e aguardar a resolução da Promise antes de navegar.
 * A Promise deve resolver para `true` para permitir a navegação, ou `false` para bloqueá-la.
 */
export const navigationGuard = writable(null);
