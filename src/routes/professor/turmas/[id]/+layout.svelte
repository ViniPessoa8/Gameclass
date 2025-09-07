<script>
	import RankingAlunos from '$lib/components/RankingAlunos.svelte';
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
		<RankingAlunos listaAlunos={data['ranking']} {idTurma} />
	{/if}
</div>

<style>
	.page-layout {
		display: flex;
	}

	.content {
		flex: 1;
		margin-bottom: 64px;
	}
</style>
