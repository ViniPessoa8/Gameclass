<script>
	import '../../static/app.css';
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { historyStack } from '$src/stores/history.js';
	import BackButton from '../../lib/components/BackButton.svelte';

	export let data;
	const BACK_SKIP = [`/${data.perfil}/turmas`];

	afterNavigate(() => {
		// Acessa o valor atual da store
		const currentStack = $historyStack;

		// Pega a última página na pilha
		const lastPage = currentStack[currentStack.length - 1];

		// Pega o pathname da página atual
		const currentPage = $page.url.pathname;

		// Evita adicionar a mesma página duas vezes seguidas na pilha
		// (acontece em recarregamentos ou navegações programáticas para a mesma rota)
		if (lastPage !== currentPage) {
			// Adiciona a página atual à pilha
			historyStack.update((stack) => [...stack, currentPage]);
		}
	});
</script>

<div class="turmas-container">
	<Header session={data} />
	<div class="content-container">
		<SideBar perfil={data.perfil} turmas={data.turmas} />
		<div class="content-page">
			<!-- TODO: melhorar design do botão -->
			{#if !BACK_SKIP.includes($page.url.pathname)}
				<BackButton />
			{/if}
			<slot></slot>
		</div>
	</div>
</div>

<style>
	.turmas-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.content-container {
		display: flex;
		flex-direction: row;
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content-page {
		width: 100%;
		height: 100%;
		padding-top: 80px;
		overflow: auto;
		box-sizing: border-box;
	}
</style>
