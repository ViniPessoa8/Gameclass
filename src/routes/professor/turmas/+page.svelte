<script>
	import TurmaGrade from '$lib/components/TurmaGrade.svelte';
	import TurmaLista from '$lib/components/TurmaLista.svelte';
	import SwitchView from '$lib/components/SwitchView.svelte';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import selectedTurma from '$src/stores/selectedTurma';

	let { data } = $props();

	let turmasLista = data.turmas;
	let currentView = $state(data.visualizacao);

	console.debug('turmasLista =>', turmasLista);

	onMount(async () => {
		$selectedTurma = null;
		if (data.toast === 'turma_criada') {
			toast.success('Turma criada com sucesso!');
		}
	});
</script>

<Toaster richColors expand position="top-center" closeButton />
<div class="content-turmas">
	<div class="header-turmas">
		<h1>Suas Turmas</h1>
		<SwitchView bind:view={currentView} preferenceKey="turmas_view_preference" />
	</div>

	<div class="turmas-container" class:lista={currentView === 'lista'}>
		{#if !turmasLista || turmasLista.length === 0}
			<div class="sem-turmas">
				<p>Não há turmas cadastradas</p>
			</div>
		{:else}
			{#each turmasLista as turma (turma.id)}
				{#if currentView === 'grade'}
					<TurmaGrade {turma} />
				{:else}
					<TurmaLista {turma} />
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	.content-turmas {
		margin-top: 30px;
		width: 100%;
	}

	.header-turmas {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto 30px auto;
		max-width: 1200px;
	}

	.header-turmas > h1 {
		font-size: 26px;
		text-align: left;
		margin: 0;
	}

	.turmas-container {
		margin: 0 auto;
		padding-top: 32px;
		padding-left: 128px;
		display: flex;
		flex-wrap: wrap;
		gap: 60px;
		margin-bottom: 64px;
		justify-content: flex-start;
	}

	.turmas-container.lista {
		flex-direction: column;
		gap: 16px;
		flex-wrap: nowrap;
	}

	.sem-turmas {
		width: 100%;
		text-align: center;
		font-size: 28px;
	}
</style>
