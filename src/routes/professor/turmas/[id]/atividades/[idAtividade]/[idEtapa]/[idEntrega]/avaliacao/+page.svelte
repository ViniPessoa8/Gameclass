<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';

	export let data;
</script>

<div class="container">
	<p class="titulo-atividade">{data.atividade.titulo}</p>
	<p class="titulo-etapa">Etapa: {data.etapa.titulo}</p>
	<p class="nome-estudante">Estudante: <b>{data.nomeEstudante}</b></p>

	<div class="criterios-grid">
		<h1>Critérios</h1>
		<div class="grid-header">
			<p class="header-titulo">Título</p>
			<p class="header-nota">Nota Obtida</p>
			<p class="header-max">Nota Max</p>
		</div>

		{#each data.etapa.criterios as criterio}
			<div class="grid-row">
				<p class="criterio-titulo">{criterio.titulo}</p>
				<div class="input-container">
					<InputText borded placeholder="Nota" width="80px" />
				</div>
				<div class="nota-max">
					<p>{criterio.pontuacao_max}</p>
				</div>
			</div>
		{/each}

		<div class="btn-finalizar">
			<Button backgroundColor="var(--cor-primaria)" color="white">Finalizar Avaliação</Button>
		</div>
	</div>
</div>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.titulo-atividade {
		font-size: 36px;
		font-weight: 600;
		margin: 24px 0 8px;
	}

	.titulo-etapa {
		font-size: 28px;
		font-weight: 500;
		margin-bottom: 8px;
	}

	.nome-estudante {
		font-size: 28px;
		font-weight: 500;
		margin: 24px 0;
	}

	.criterios-grid {
		width: 80%;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 16px;
		margin-top: 32px;
	}

	.criterios-grid > h1 {
		grid-column: 1 / -1;
		font-size: 24px;
		margin-bottom: 16px;
	}

	.grid-header {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 16px;
		font-weight: bold;
		border-bottom: 2px solid #ddd;
		padding-bottom: 8px;
	}

	/* Alinhamento dos headers */
	.header-titulo {
		font-weight: 600;
		text-align: left;
		padding-left: 8px;
	}

	.header-nota,
	.header-max {
		font-weight: 600;
		text-align: center;
		width: 100px; /* Largura fixa para alinhar com os inputs */
	}

	.grid-row {
		display: contents;
	}

	.grid-row > * {
		padding: 12px 0;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
	}

	.criterio-titulo {
		font-size: 20px;
		font-weight: 500;
		padding-left: 8px;
		min-width: 150px;
		max-width: 250px;
		word-break: break-word;
		white-space: normal;
	}

	.input-container {
		display: flex;
		justify-content: center;
		width: 100px; /* Mesma largura do header */
		margin: 0 auto;
	}

	.nota-max {
		justify-content: center;
		font-weight: bold;
		font-size: 24px;
		width: 100px; /* Mesma largura do header */
	}

	.btn-finalizar {
		grid-column: 1 / -1;
		margin-top: 40px;
		display: flex;
		justify-content: center;
	}
</style>
