<script>
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	export let data;

	data.data_criacao = 'teste';

	if (!$selectedTurmaTabBar) {
		$selectedTurmaTabBar = 4;
	}
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-relatorio">
	<h1>Relatório da turma</h1>
	<div class="relatorio-grid">
		<div class="visao-geral">
			<h2>Visão Geral</h2>
			<div class="grid-item-flex">
				<div class="card">
					<p>Criada em: {data.data_criacao}</p>
				</div>
			</div>
		</div>
		<div class="alunos">
			<h2>Alunos</h2>
			<div class="grid-item-flex">
				<div class="card">
					<p>Criada em: {data.data_criacao}</p>
				</div>
			</div>
		</div>
		<div class="atividades">
			<h2>Atividades</h2>
			<div class="grid-item-flex">
				<div class="card">
					<p>Criada em: {data.data_criacao}</p>
				</div>
				<div class="card">
					<p>Criada em: {data.data_criacao}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style scoped>
	.content-relatorio {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 24px;
		padding: 24px 128px;
	}

	.relatorio-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		gap: 24px;
	}

	.relatorio-grid > div {
		padding: 8px;
	}

	.relatorio-grid > div > h2 {
		padding-bottom: 12px;
	}

	.atividades {
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.card {
		border: 1px solid grey;
		border-radius: 4px;
		background-color: #e8f1f9;
		width: fit-content;
		padding: 4px;
		font-weight: 600;
		font-size: 18px;
	}

	.grid-item-flex {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}
</style>
