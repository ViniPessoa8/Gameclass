<script>
	import Button from '$lib/components/Button.svelte';

	export let data;
	console.debug('[DATA]', data);
</script>

<div class="container">
	<h1>[Nome da ativiade]</h1>
	<h3>Etapa: [Nome da etapa]</h3>

	<h2>[Nome do Aluno/Grupo]</h2>

	<div class="criterios-container">
		<h1>Critérios</h1>
		{#each data.etapa.criterios as criterio}
			<div class="criterio">
				<p>{criterio.titulo}</p>
				<input />
				<p>{criterio.pontuacao_max}</p>
			</div>
		{/each}

		<Button>Finalizar Avaliação</Button>
	</div>
</div>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.criterio {
		width: 300px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
