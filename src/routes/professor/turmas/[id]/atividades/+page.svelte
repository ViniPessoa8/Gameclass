<script>
	import { page } from '$app/stores';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import AtividadeTurma from '$lib/components/AtividadeTurma.svelte';
	import ButtonRedirect from '$lib/components/ButtonRedirect.svelte';

	export let data;
	let atividades;
	let id;

	$: atividades = data.atividades;
	$: id = $page.params.id;
</script>

<TurmaTabBar />
<div class="content-turma">
	<h1>Atividades</h1>
	{#if atividades.length == 0}
		<p>(Não há atividades nessa turma)</p>
	{:else}
		{#each atividades as atividade}
			<AtividadeTurma {atividade} idTurma={id} />
		{/each}
	{/if}
	<ButtonRedirect href="/${data.perfil}/turmas/{id}/atividades/create"
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
