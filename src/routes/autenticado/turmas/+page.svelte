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
		{#each turmasLista as turma}
			<Turma
				titulo={turma.nome}
				disciplina={turma.disciplina}
				ano={turma.ano}
				cor={turma.cor}
				nEstudantes={turma.numero_alunos}
			/>
		{/each}
	</div>
</div>

<style>
	.content-turmas {
		margin-top: 30px;
		width: 100%;
		height: 100%;
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
	}
</style>
