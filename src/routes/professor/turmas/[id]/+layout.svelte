<script>
	import RankingAlunos from '$lib/components/RankingAlunos.svelte';
	import { page } from '$app/stores';

	$: urlAtual = $page.url.href;

	export let data;
	const idTurma = data.idTurma;
</script>

<div>
	{#if !urlAtual.includes('create') && urlAtual.split('/').length < 8}
		<RankingAlunos listaAlunos={data['ranking']} {idTurma} />
	{/if}
	<slot></slot>
</div>

<style>
</style>
