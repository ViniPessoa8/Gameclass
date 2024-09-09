<script>
	import { page } from '$app/stores';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import AtividadeTurma from '$lib/components/AtividadeTurma.svelte';
	let id = $page.params.id;

	console.log('TURMAS/ID DATA:', id);
</script>

<TurmaTabBar />
<div class="content-turma">
	<h1>Atividades</h1>
	<AtividadeTurma />
	<AtividadeTurma />
</div>

<style>
	.content-turma {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
	}

	.content-turma > h1 {
		margin-bottom: 48px;
	}
</style>
