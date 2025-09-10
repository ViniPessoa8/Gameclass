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
		gap: 24px; /* Adiciona um espaço entre o conteúdo e a sidebar */
	}

	.content {
		flex: 3;
		margin-bottom: 64px;
	}

	/* 3. Estilize a nova barra lateral */
	.sidebar {
		height: fit-content; /* 4. Garante que a altura do container seja baseada no seu conteúdo */
		display: flex;
		flex-direction: column;
		gap: 16px; /* Espaço entre o ranking e o botão de convite */
		padding-bottom: 64px;
	}
</style>
