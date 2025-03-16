<script>
	import RankingAlunos from '$lib/components/RankingAlunos.svelte';

	export let data;

</script>

<div class="container">
	<RankingAlunos listaAlunos={data['ranking']} />
	<slot></slot>
</div>

<style>
</style>
