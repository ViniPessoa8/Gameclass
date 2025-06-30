<script>
	import RankingAlunos from '$lib/components/RankingAlunos.svelte';
	import { page } from '$app/stores';

	$: urlAtual = $page.url.href;

	export let data;
</script>

<div>
	{#if !urlAtual.includes('create') && urlAtual.split('/').length < 8}
		<RankingAlunos listaAlunos={data['ranking']} />
	{/if}
	<slot></slot>
</div>

<style>
</style>
