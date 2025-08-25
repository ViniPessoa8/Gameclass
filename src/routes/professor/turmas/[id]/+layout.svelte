<script>
	import RankingAlunos from '$lib/components/RankingAlunos.svelte';
	import { page } from '$app/stores';

	$: urlAtual = $page.url.href;

	export let data;
	const idTurma = data.idTurma;
</script>

<div class="page-layout">
	<div class="content">
		<slot></slot>
	</div>
	{#if !urlAtual.includes('create') && urlAtual.split('/').length < 8}
		<RankingAlunos listaAlunos={data['ranking']} {idTurma} />
	{/if}
</div>

<style>
	.page-layout {
		display: flex;
		min-height: 100vh;
	}

	.content {
		flex: 1;
		margin-bottom: 64px;
	}
</style>
