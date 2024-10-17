<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import EtapasBarraLateral from '$lib/components/EtapasBarraLateral.svelte';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO, REALIZACAO, LIMITE_DE_PONTOS_DA_ETAPA } from '$lib/constants';
	import selectedEtapa from '$src/stores/selectedEtapa.js';
	import { onMount } from 'svelte';

	// export let data;

	let novoCriterioTitulo = '';
	let novoCriterioNota = '';
	let erroNotaCriterio = false;

	let realizacaoOpcoes = [
		{ name: 'realizacao_individual', text: 'Individual' },
		{ name: 'realizacao_grupos', text: 'Em Grupos' }
	];

	let atribuicaoOpcoes = [
		{ name: 'media_simples', text: 'Média Simples' },
		{ name: 'media_ponderada', text: 'Média Ponderada' }
	];

	let dateNow = new Date();
	let dateNowString = dateNow.toISOString();
	let dateNowFormated = dateNowString.slice(0, dateNowString.indexOf(':', 16));

	let etapas = [
		{
			id: 1,
			titulo: '',
			dtEntregaMin: dateNowFormated,
			dtEntregaMax: '', // TODO: Validar campo
			realizacaoGroup: 'Individual',
			atribuicaoNotasGroup: 'Média Simples',
			receberAposPrazo: true,
			criterios: [
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
			]
		}
	];

	if (!$selectedEtapa) {
		$selectedEtapa = 0;
	}

	function onSubmit(formData) {
		let realizacao = etapas[$selectedEtapa].realizacaoGroup;
		let atribuicaoNotas = etapas[$selectedEtapa].atribuicaoNotasGroup;
		let notaMax = etapas[$selectedEtapa].criterios
			.map((criterio) => criterio.nota_max)
			.reduce((item, acc) => item + acc);

		// TODO: Validar dados
		atribuicaoNotas =
			atribuicaoNotas === 'Média Simples' ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada;
		realizacao = realizacao === 'Individual' ? REALIZACAO.individual : REALIZACAO.grupos;

		// TODO: Formatar dados para que envie todas as etapas ao mesmo tempo

		formData.set('etapas', etapas);

		// formData.set('atribuicaoNotas', atribuicaoNotas);
		// formData.set('realizacao', realizacao);
		// formData.set('receberAposPrazo', receberAposPrazo);
		// formData.set('notaMax', notaMax);
		// formData.set('receberAposPrazo', receberAposPrazo);
		// formData.set('idAtividadePai', idAtividadePai);
		// formData.set('criterios', JSON.stringify(criterios));

		// formData.delete('realizacao_individual');
		// formData.delete('atribuicao_individual');
		// formData.delete('realizacao_grupos');
		// formData.delete('atribuicao_grupos');

		return true;
	}

	function onAdicionaCriterio() {
		if (!novoCriterioTitulo || !novoCriterioNota) {
			console.error('Definir critério: Dados incompletos');
		}

		novoCriterioNota = parseFloat(novoCriterioNota);

		let novoCriterio = {
			titulo: novoCriterioTitulo,
			nota_max: novoCriterioNota
		};

		let totalPontos = etapas[$selectedEtapa].criterios
			.map((elem) => elem.nota_max)
			.reduce((i, acc) => acc + i);
		if (totalPontos + novoCriterioNota > LIMITE_DE_PONTOS_DA_ETAPA) {
			erroNotaCriterio = true;
			return;
		} else {
			erroNotaCriterio = false;
		}

		$: etapas[$selectedEtapa].criterios = [...etapas[$selectedEtapa].criterios, novoCriterio];

		console.log(etapas[$selectedEtapa].criterios);

		novoCriterioTitulo = '';
		novoCriterioNota = '';
	}

	onMount(() => {
		if (!$selectedEtapa) {
			$selectedEtapa = 0;
		}

		realizacaoOpcoes = [
			{ name: 'realizacao_individual', text: 'Individual' },
			{ name: 'realizacao_grupos', text: 'Em Grupos' }
		];

		atribuicaoOpcoes = [
			{ name: 'media_simples', text: 'Média Simples' },
			{ name: 'media_ponderada', text: 'Média Ponderada' }
		];
	});
</script>

<div class="panel">
	<EtapasBarraLateral {etapas} bind:selectedEtapa={$selectedEtapa} />
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

					console.debug(formData.get('titulo'));
					// formData.delete('media_simples');
					// formData.set('tags', JSON.stringify(tagsColors));

					return async ({ result, update }) => {
						console.debug('post result:', result);
						await update();
					};
				}}
			>
				<div class="form-content">
					<div class="info-container">
						<h1>Informações</h1>
						<div class="row">
							<h2>Título da etapa:</h2>
							<InputText borded bind:value={etapas[$selectedEtapa].titulo} game="titulo" />
						</div>
						<div class="row">
							<h2>Data de início:</h2>
							<InputDatetime
								borded
								bind:value={etapas[$selectedEtapa].dtEntregaMin}
								name="dtEntregaMin"
							/>
						</div>
						<div class="row">
							<h2>Data máxima de entrega:</h2>
							<InputDatetime
								borded
								bind:value={etapas[$selectedEtapa].dtEntregaMax}
								name="dtEntregaMax"
							/>
						</div>
						<div class="row">
							<h2>Realização:</h2>
							<InputRadio
								borded
								name="realizacao"
								bind:group={etapas[$selectedEtapa].realizacaoGroup}
								bind:options={realizacaoOpcoes}
							/>
						</div>
						<div class="row">
							<h2>Atribuição de Notas:</h2>
							<InputRadio
								borded
								name="atribuicao_notas"
								bind:group={etapas[$selectedEtapa].atribuicaoNotasGroup}
								options={atribuicaoOpcoes}
							/>
						</div>
						<div class="row">
							<InputCheckbox
								bind:checked={etapas[$selectedEtapa].receberAposPrazo}
								text="Receber após o prazo"
							/>
							<IconeInformacao text="Receber a tarefa mesmo que o prazo final tenha passado." />
						</div>
					</div>
					<div class="criterios-container">
						<h1>Critérios</h1>
						<form name="form-criterio">
							<div class="column">
								<!-- TODO: Limitar input de dados com mascaras  -->
								<!-- TODO: Adicionar critério ao clicar no botão -->
								<!-- TODO: Limpar formulário ao adicionar critério -->
								<div class="row">
									<InputText
										borded
										name="titulo-criterio"
										placeholder="Novo critério"
										bind:value={novoCriterioTitulo}
									/>
									<InputText
										borded
										name="nota-max-criterio"
										placeholder="0,0"
										width="50px"
										bind:value={novoCriterioNota}
									/>
									<Button
										borded
										color="var(--cor primaria)"
										backgroundColor="var(--cor-secundaria)"
										type="button"
										on:click={onAdicionaCriterio}>+</Button
									>
								</div>
								{#if erroNotaCriterio}
									<p class="erro-criterio">
										*Critério ultrapassa limite de {LIMITE_DE_PONTOS_DA_ETAPA} pontos
									</p>
								{:else}
									<p class="erro-criterio" style="visibility: hidden;">
										*Critério ultrapassa limite de {LIMITE_DE_PONTOS_DA_ETAPA} pontos
									</p>
								{/if}
							</div>
						</form>
						<div class="criterios-definidos">
							<hr />
							{#each etapas[$selectedEtapa].criterios as criterio}
								<div class="criterio-container">
									<h2>{criterio.titulo}</h2>
									<h2>{criterio.nota_max.toFixed(2)}</h2>
								</div>
								<hr />
							{/each}
							<h2 class="total-de-pontos">
								Total de pontos:&emsp;
								{parseFloat(
									etapas[$selectedEtapa].criterios.map((x) => x.nota_max).reduce((a, b) => a + b)
								).toFixed(2)}pts
							</h2>
						</div>
					</div>
				</div>
				{#if etapas[$selectedEtapa].realizacaoGroup === 'Individual'}
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

	.column {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
		/* gap: 20px; */
		/* margin-top: 20px; */
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

	.erro-criterio {
		margin-left: 8px;
		justify-self: flex-start;
		color: red;
	}
</style>
