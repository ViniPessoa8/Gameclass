<script>
	import { goto } from '$app/navigation';
	import { historyStack } from '$src/stores/history.js';
	import Button from './Button.svelte';

	function goBack() {
		// Remove a página atual da pilha
		$historyStack.pop();

		// Pega a página anterior (que agora é a última na pilha)
		const previousPage = $historyStack[$historyStack.length - 1];

		// Atualiza a store com a pilha modificada (sem a página atual)
		historyStack.set($historyStack);

		if (previousPage) {
			// Navega para a página anterior usando o goto do SvelteKit
			// O { replaceState: true } evita que a navegação "para trás" crie uma nova entrada no histórico do navegador
			goto(previousPage, { replaceState: true });
		} else {
			// Fallback: se não houver página anterior na nossa pilha, vai para a home
			goto('/', { replaceState: true });
		}
	}

	// Condição para exibir o botão:
	// Só mostra o botão se houver mais de uma página no histórico.
	// A primeira página é a entrada inicial, então não há para onde "voltar".
	$: showButton = $historyStack.length > 1;
</script>

{#if showButton}
	<div class="button-container">
		<Button backgroundColor="var(--cor-primaria)" color="white" on:click={goBack}>{'<-'}</Button>
	</div>
	<!-- <button on:click={goBack}> -->
	<!-- 	&larr; Voltar -->
	<!-- </button> -->
{/if}

<style>
	.button-container {
		position: absolute;
		margin: 20px;
	}
	/* button { */
	/* 	padding: 0.5rem 1rem; */
	/* 	border: 1px solid #ccc; */
	/* 	background-color: #f0f0f0; */
	/* 	border-radius: 4px; */
	/* 	cursor: pointer; */
	/* 	font-size: 1rem; */
	/* } */
	/* button:hover { */
	/* 	background-color: #e0e0e0; */
	/* } */
</style>
