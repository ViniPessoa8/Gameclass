<script>
	import RankingAlunos from '$lib/components/RankingAlunos.svelte';
	import ConvidaEstudante from '$lib/components/ConvidaEstudante.svelte';
	import { page } from '$app/stores';

	let urlAtual = $derived($page.url.href);

	let { data, children } = $props();
	const idTurma = data.idTurma;
</script>

<div class="page-layout">
	<div class="content">
		{@render children?.()}
	</div>

	{#if !urlAtual.includes('create') && urlAtual.split('/').length < 8}
		<aside class="sidebar">
			<RankingAlunos listaAlunos={data['ranking']} {idTurma} />
			<ConvidaEstudante />
		</aside>
	{/if}
</div>

<style>
	.page-layout {
		display: flex;
	}

	.content {
		flex: 3;
		margin-bottom: 64px;
		overflow-x: auto;
	}

	.sidebar {
		position: sticky;
		max-width: 300px;
		height: fit-content;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
	}
</style>
