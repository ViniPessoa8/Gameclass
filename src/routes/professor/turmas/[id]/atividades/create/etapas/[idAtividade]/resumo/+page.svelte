<script>
	import { onMount, beforeUpdate } from 'svelte';

	export let data;
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
			</div>
		{/each}
	</div>
	<!-- <h2>Etapa: {data.etapa.titulo}</h2> -->
	<!-- <p>{data.etapa.descricao}</p> -->
	<!-- <AtividadeInfo -->
	<!-- 	realizacao={data.etapa.em_grupos ? 'Em Grupos' : 'Individual'} -->
	<!-- 	prazo={formatter.format(data.atividade.data_entrega_final)} -->
	<!-- 	avaliacao={data.etapa.em_grupos ? 'Em Grupos' : 'Individual'} -->
	<!-- /> -->
	<!-- <div class="container-entregas"> -->
	<!-- 	<div class="entregas-header"> -->
	<!-- 		<p>Entregas:</p> -->
	<!-- 	</div> -->
	<!-- 	<div class="entregas"> -->
	<!-- 		{#each entregas_por_estudante as entrega} -->
	<!-- 			<EnvioEstudante {entrega} onClick={() => onClick(entrega.id)} /> -->
	<!-- 		{/each} -->
	<!-- 	</div> -->
	<!-- </div> -->
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
		padding: 4px 0px;
		border-bottom: 1px solid black;
	}

	.criterio-container > p {
	}

	.content-etapa > p {
		margin-bottom: 24px;
	}

	.entregas-header {
		padding-left: 48px;
		font-size: 24px;
		text-align: left;
	}

	.entregas {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 24px;
		justify-content: center;
	}
</style>
