<script>
	import { onMount, beforeUpdate } from 'svelte';

	let etapas;

	beforeUpdate(() => {
		etapas = JSON.parse(sessionStorage.getItem('etapasData'));
	});

	onMount(() => {});
</script>

<div class="content-etapa">
	<h1><u>Resumo de critérios para avaliação da atividade</u></h1>
	<h2>[tituloAtividade]</h2>
	<div class="info-container">
		<p>Forma de avaliação dos critérios:</p>
		<div class="forma-avaliacao-container">
			<div class="forma-avaliacao"></div>
			<div class="info-button"></div>
		</div>
	</div>
	<h2>Critérios</h2>
	<div class="container-etapas">
		{#each etapas as etapa}
			<div class="container-etapa">
				<h3 class="titulo-etapa">{etapa.titulo}</h3>
				<div class="criterio-container">
					<p class="titulo-criterio"><b>Título</b></p>
					<p class="descricao-criterio"><b>Descrição</b></p>
					<p class="nota-criterio"><b>Nota</b></p>
				</div>
				{#each etapa.criterios as criterio}
					<div class="criterio-container">
						<p class="titulo-criterio">{criterio.titulo}</p>
						<p class="descricao-criterio">{criterio.descricao}</p>
						<p class="nota-criterio">{criterio.nota_max}</p>
					</div>
				{/each}
				<p class="nota-total">
					Nota total: {etapa.criterios.reduce((previous, current) => {
						return previous + parseFloat(current.nota_max);
					}, 0)}
				</p>
			</div>
		{/each}
	</div>
</div>

<style scoped>
	.content-etapa {
		display: flex;
		flex-direction: column;
		text-align: center;
		padding-top: 126px;
		padding-left: 96px;
		padding-right: 96px;
	}

	.content-etapa > h1 {
		margin-bottom: 12px;
	}

	.content-etapa > h2 {
		margin-bottom: 36px;
	}

	.content-etapa > h2 {
		margin-bottom: 24px;
	}

	.container-etapa {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin: 0px 300px;
		margin-bottom: 16px;
	}

	.titulo-etapa {
		font-size: 28px;
		margin-bottom: 12px;
	}

	.criterio-container {
		display: grid;
		grid-template-columns: 1fr 2fr 50px;
		gap: 24px;
		font-size: 20px;
		margin-left: 12px;
		padding: 6px 0px;
		border-bottom: 1px solid black;
	}

	.nota-total {
		margin-top: 6px;
		font-size: 20px;
		font-weight: 600;
		text-align: right;
	}
</style>
