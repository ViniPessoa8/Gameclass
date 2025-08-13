<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import AtividadeTurma from '$lib/components/AtividadeTurma.svelte';
	import ButtonRedirect from '$lib/components/ButtonRedirect.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	export let data;
	let atividades;
	let id;
	let url;

	$: atividades = data.atividades;
	$: id = $page.params.id;
	$: url = `/${data.perfil}/turmas/${id}/atividades/create`;

	$selectedTurmaTabBar = 1;

	onMount(async () => {
		if (data.toast === 'atividade_criada') {
			toast.success('Atividade criada com sucesso');
		}

		if (data.toast === 'etapas_criadas') {
			toast.success('Etapa(s) definida(s) com sucesso.');
		}
		sessionStorage.removeItem('grupos');
	});
</script>

<Toaster richColors position="top-center" closeButton />
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
	<ButtonRedirect href={url}>Criar nova atividade</ButtonRedirect>
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
