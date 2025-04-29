<script>
	export let data;
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
