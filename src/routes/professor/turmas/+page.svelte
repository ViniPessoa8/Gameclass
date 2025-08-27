<script>
	import Turma from '$lib/components/Turma.svelte';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import selectedTurma from '$src/stores/selectedTurma';

	export let data;

	let turmasLista = data.turmas;

	onMount(async () => {
		$selectedTurma = null;
		if (data.toast === 'turma_criada') {
			toast.success('Turma criada com sucesso!');
		}
	});
</script>

<Toaster richColors expand position="top-center" closeButton />
<div class="content-turmas">
	<h1>Suas Turmas</h1>
	<div class="turmas-container">
		{#if !turmasLista}
			<div class="sem-turmas">
				<p>Não há turmas cadastradas</p>
			</div>
		{:else}
			{#each turmasLista as turma}
				<Turma {turma} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.content-turmas {
		margin-top: 30px;
		width: 100%;
	}

	.content-turmas > h1 {
		size: 26px;
		text-align: center;
	}

	.turmas-container {
		margin-left: 94px;
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
		gap: 60px;
		margin-bottom: 64px;
	}

	.sem-turmas {
		margin-right: 94px;
		width: 100%;
		text-align: center;
		font-size: 28px;
	}
</style>
