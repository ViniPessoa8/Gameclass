<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import AtividadeTurma from '$lib/components/AtividadeTurma.svelte';
	import ButtonRedirect from '$lib/components/ButtonRedirect.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	let { data } = $props();

	let atividades = $derived(data.atividades);
	let id = $derived($page.params.id);
	let url = $derived(`/${data.perfil}/turmas/${id}/atividades/create`);

	const maxEtapas = parseInt(data.config?.max_etapas);

	$selectedTurmaTabBar = 1;

	onMount(async () => {
		if (data.toast === 'atividade_criada') {
			toast.success('Atividade criada com sucesso');
		}

		if (data.toast === 'etapas_criadas') {
			toast.success('Etapa definida com sucesso.');
		}

		if (data.toast === 'atividade_editada') {
			toast.success('Atividade editada com sucesso.');
		}

		if (data.toast === 'etapa_editada') {
			toast.success('Etapa editada com sucesso.');
		}

		sessionStorage.removeItem('etapas');
		sessionStorage.removeItem('grupos');
	});

	function comparaAtividade(a, b) {
		return a.id - b.id;
	}
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-turma">
	<h1>Atividades</h1>
	{#if atividades.length == 0}
		<p>(Não há atividades nessa turma)</p>
	{:else}
		{#each atividades.sort(comparaAtividade) as atividade (atividade.id)}
			<AtividadeTurma {atividade} idTurma={id} {maxEtapas} />
		{/each}
	{/if}
	<ButtonRedirect id="btnCriarAtividade" href={url}>Criar nova atividade</ButtonRedirect>
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
