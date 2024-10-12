<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import EtapasBarraLateral from '$lib/components/EtapasBarraLateral.svelte';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO, REALIZACAO } from '$lib/constants';
	import selectedEtapa from '$src/stores/selectedEtapa.js';
	import { onMount } from 'svelte';

	export let data;

	// {
	// 	id: 2,
	// 	titulo: 'teste 2'
	// }
	let etapas = [
		{
			id: 1,
			titulo: ''
		}
	];

	if (!$selectedEtapa) {
		$selectedEtapa = etapas[0].id;
	}

	console.log($selectedEtapa);

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

	let realizacaoOpcoes = [
		{ name: 'realizacao_individual', text: 'Individual' },
		{ name: 'realizacao_grupos', text: 'Em Grupos' }
	];

	let atribuicaoOpcoes = [
		{ name: 'media_simples', text: 'Média Simples' },
		{ name: 'media_ponderada', text: 'Média Ponderada' }
	];

	let titulo = '';
	let dtEntregaMin = '1999-12-06T16:20'; // TODO: usar a data atual
	let dtEntregaMax = '1999-12-06T16:20';
	let realizacaoGroup = [];
	let atribuicaoNotasGroup = [];
	let receberAposPrazo = true;
	let idAtividadePai = data.idAtividadePai;

	function onSubmit(formData) {
		let realizacao = realizacaoGroup;
		let atribuicaoNotas = atribuicaoNotasGroup;
		let notaMax = criterios.map((criterio) => criterio.nota_max).reduce((item, acc) => item + acc);

		// TODO: Validar dados

		atribuicaoNotas =
			atribuicaoNotas === 'Média Simples' ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada;
		realizacao = realizacao === 'Individual' ? REALIZACAO.individual : REALIZACAO.grupos;

		formData.set('atribuicaoNotas', atribuicaoNotas);
		formData.set('realizacao', realizacao);
		formData.set('receberAposPrazo', receberAposPrazo);
		formData.set('notaMax', notaMax);
		formData.set('receberAposPrazo', receberAposPrazo);
		formData.set('idAtividadePai', idAtividadePai);
		formData.set('criterios', JSON.stringify(criterios));

		formData.delete('realizacao_individual');
		formData.delete('atribuicao_individual');
		formData.delete('realizacao_grupos');
		formData.delete('atribuicao_grupos');

		return true;
	}

	function tituloInputHandler(e) {
		let etapaIndex = $selectedEtapa - 1;
		console.debug(etapas[etapaIndex]);
		etapas[etapaIndex].titulo = titulo;
	}

	function onMudaEtapa() {
		console.log($selectedEtapa);
		titulo = etapas[$selectedEtapa - 1].titulo;
	}

	onMount(() => {
		if (!$selectedEtapa) {
			$selectedEtapa = etapas[0].id;
		}
	});
</script>

<!-- TODO: Barra lateral de etapas -->
<div class="panel">
	<EtapasBarraLateral {etapas} bind:selectedEtapa={$selectedEtapa} {onMudaEtapa} />
	<div class="content-container">
		<h1>Calculados</h1>
		<h2>Definição das etapas da atividade</h2>
		<div class="form-container">
			<form
				class="cria-etapa-form"
				method="post"
				use:enhance={({ formData, cancel }) => {
					console.debug('postou:', formData);
					if (!onSubmit(formData) /* || form?.already_registered */) {
						cancel();
					}

					// formData.delete('media_simples');
					// formData.set('tags', JSON.stringify(tagsColors));

					return async ({ result, update }) => {
						console.debug('post result:', result);
						await update(); // TODO: Remover reset false
					};
				}}
			>
				<div class="form-content">
					<div class="info-container">
						<h1>Informações</h1>
						<div class="row">
							<h2>Título da etapa:</h2>
							<InputText
								borded
								bind:value={titulo}
								inputHandler={tituloInputHandler}
								game="titulo"
							/>
						</div>
						<div class="row">
							<h2>Data de início:</h2>
							<InputDatetime borded bind:value={dtEntregaMin} name="dtEntregaMin" />
						</div>
						<div class="row">
							<h2>Data máxima de entrega:</h2>
							<InputDatetime borded bind:value={dtEntregaMax} name="dtEntregaMax" />
						</div>
						<div class="row">
							<h2>Realização:</h2>
							<InputRadio
								borded
								name="realizacao"
								bind:group={realizacaoGroup}
								bind:options={realizacaoOpcoes}
							/>
						</div>
						<div class="row">
							<h2>Atribuição de Notas:</h2>
							<InputRadio
								borded
								name="atribuicao_notas"
								bind:group={atribuicaoNotasGroup}
								options={atribuicaoOpcoes}
							/>
						</div>
						<div class="row">
							<InputCheckbox bind:checked={receberAposPrazo} text="Receber após o prazo" />
							<IconeInformacao text="Receber a tarefa mesmo que o prazo final tenha passado." />
						</div>
					</div>
					<div class="criterios-container">
						<h1>Critérios</h1>
						<form name="form-criterio">
							<div class="row">
								<!-- TODO: Limitar input de dados com mascaras  -->
								<!-- TODO: Adicionar critério ao clicar no botão -->
								<!-- TODO: Limpar formulário ao adicionar critério -->
								<InputText borded name="titulo-criterio" placeholder="Novo critério" />
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
				</div>
				{#if realizacaoGroup === 'Individual'}
					<Button type="submit" color="var(--text-1)" backgroundColor="var(--cor-secundaria)"
						>Próximo</Button
					>
				{:else}
					<Button type="submit" color="var(--text-1)" backgroundColor="var(--cor-secundaria)"
						>Definir formação de grupos</Button
					>
				{/if}
			</form>
		</div>
	</div>
</div>

<style>
	.panel {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 40px;
	}

	.criterios-container {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 60px;
	}

	.form-content {
		display: flex;
		flex-direction: row;
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
