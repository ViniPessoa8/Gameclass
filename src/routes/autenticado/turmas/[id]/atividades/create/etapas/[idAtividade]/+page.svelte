<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import Button from '$lib/components/Button.svelte';

	let realizacao_opcoes = [
		{
			nome: 'teste',
			text: 'teste'
		}
	];

	let criterios = [
		{
			titulo: 'Documentação',
			nota_max: 3.0
		},
		{
			titulo: 'Formatação',
			nota_max: 5.0
		},
		{
			titulo: 'Apresentação',
			nota_max: 2.0
		}
	];

	let titulo = '';
	let data_entrega_inicial = '1999-12-06T16:20'; // TODO: usar a data atual
	let data_entrega_final = '1999-12-06T16:20';

	let realizacao_group = [];
	let atribuicao_notas_group = [];
</script>

<!-- TODO: Barra lateral de etapas -->
<div class="content-container">
	<h1>Calculados</h1>
	<h2>Definição das etapas da atividade</h2>
	<div class="form-container">
		<form>
			<div class="info-container">
				<div class="row">
					<h2>Título da etapa:</h2>
					<InputText borded bind:value={titulo} name="titulo" />
				</div>
				<div class="row">
					<h2>Data de início:</h2>
					<InputDatetime borded bind:value={data_entrega_inicial} name="data_entrega_min" />
				</div>
				<div class="row">
					<h2>Data máxima de entrega:</h2>
					<InputDatetime borded bind:value={data_entrega_final} name="data_entrega_max" />
				</div>
				<div class="row">
					<h2>Realização:</h2>
					<InputRadio
						borded
						name="realizacao"
						bind:group={realizacao_group}
						options={[
							{ name: 'realizacao_individual', text: 'Individual' },
							{ name: 'realizacao_grupos', text: 'Em Grupos' }
						]}
					/>
				</div>
				<div class="row">
					<h2>Atribuição de Notas:</h2>
					<InputRadio
						borded
						name="atribuicao_notas"
						bind:group={atribuicao_notas_group}
						options={[
							{ name: 'atribuicao_individual', text: 'Individual' },
							{ name: 'atribuicao_grupos', text: 'Em Grupos' }
						]}
					/>
				</div>
			</div>
			<div class="criterios-container">
				<form name="form-criterio">
					<div class="row">
						<!-- TODO: Limitar input de dados com mascaras  -->
						<!-- TODO: Adicionar critério ao clicar no botão -->
						<!-- TODO: Limpar formulário ao adicionar critério -->
						<InputText borded name="titulo-criterio" placeholder="Título" />
						<InputText borded name="nota-max-criterio" placeholder="0,0" width="50px" />
						<Button borded color="var(--cor primaria)" backgroundColor="var(--cor-secundaria)"
							>+</Button
						>
					</div>
				</form>
				<div class="criterios-definidos">
					<hr />
					{#each criterios as criterio}
						<div class="criterio-container">
							<h2>{criterio.titulo}</h2>
							<h2>{criterio.nota_max.toFixed(2)}</h2>
						</div>
						<hr />
					{/each}
					<h2 class="total-de-pontos">
						Total de pontos:&emsp;
						{parseFloat(criterios.map((x) => x.nota_max).reduce((a, b) => a + b)).toFixed(2)}pts
					</h2>
				</div>
			</div>
		</form>
	</div>
</div>

<style>
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: row;
		gap: 10em;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 20px;
	}

	.info-container {
		margin-top: 40px;
	}

	.criterios-container {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 60px;
	}

	.total-de-pontos {
		margin-top: 12px;
		margin-right: 8px;
		text-align: end;
	}

	.criterio-container {
		width: 400px;
		padding: 10px 10px 10px 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
</style>
