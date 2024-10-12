<script>
	import { page } from '$app/stores';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import AtividadeTurma from '$lib/components/AtividadeTurma.svelte';
	import ButtonRedirect from '$lib/components/ButtonRedirect.svelte';

	export let data;
	let atividades = data.atividades;
	let id = $page.params.id;
</script>

<TurmaTabBar />
<div class="content-turma">
	<h1>Atividades</h1>
	{#if atividades.length == 0}
		<p>(Não há atividades nessa turma)</p>
	{/if}
	{#each atividades as atividade}
		<AtividadeTurma {atividade} />
	{/each}
	<ButtonRedirect href="/autenticado/turmas/{id}/atividades/create"
		>Criar nova atividade</ButtonRedirect
	>
</div>

<style>
	.content-turma {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
	}

	p {
		margin-top: 64px;
		margin-bottom: 96px;
		font-size: 24px;
	}

	.content-turma > h1 {
		margin-bottom: 48px;
	}
</style>
