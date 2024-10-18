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
			criterios: []
		}
	];

	if (!$selectedEtapa) {
		$selectedEtapa = 0;
	}

	function onMudaEtapa() {
		if (etapas[$selectedEtapa].titulo === '') {
			return false;
		}

		return true;
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

		console.assert(etapas.length !== 0, 'Erro ao submeter: lista de etapas vazia');
		formData.set('etapas', JSON.stringify(etapas));

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
			erroNotaCriterio = [true, `*Digite o título e a nota`];
			return;
		}

		novoCriterioNota = parseFloat(novoCriterioNota);

		let novoCriterio = {
			titulo: novoCriterioTitulo,
			nota_max: novoCriterioNota
		};

		let totalPontos;
		if (etapas[$selectedEtapa].criterios.length !== 0) {
			totalPontos = etapas[$selectedEtapa].criterios
				.map((elem) => elem.nota_max)
				.reduce((i, acc) => acc + i);
		} else {
			totalPontos = 0;
		}

		if (totalPontos + novoCriterioNota > LIMITE_DE_PONTOS_DA_ETAPA) {
			erroNotaCriterio = [
				true,
				`*Critério ultrapassa limite de ${LIMITE_DE_PONTOS_DA_ETAPA} pontos`
			];
			return;
		} else {
			erroNotaCriterio = [false, ''];
		}

		if (etapas[$selectedEtapa].criterios.length !== 0) {
			$: etapas[$selectedEtapa].criterios = [...etapas[$selectedEtapa].criterios, novoCriterio];
		} else {
			$: etapas[$selectedEtapa].criterios = [novoCriterio];
		}

		novoCriterioTitulo = '';
		novoCriterioNota = '';
	}

	function onRemoveCriterio(criterio) {
		etapas[$selectedEtapa].criterios = etapas[$selectedEtapa].criterios.filter((elem) => {
			return elem !== criterio;
		});
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

					console.debug(JSON.parse(formData.get('etapas')));
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
								{#if erroNotaCriterio[0]}
									<p class="erro-criterio">{erroNotaCriterio[1]}</p>
								{:else}
									<p class="erro-criterio" style="visibility: hidden;">{erroNotaCriterio[1]}</p>
								{/if}
							</div>
						</form>
						<div class="criterios-definidos">
							<hr />
							{#each etapas[$selectedEtapa].criterios as criterio}
								<div class="criterio-container">
									<h2>{criterio.titulo}</h2>
									<h2>{criterio.nota_max.toFixed(2)}</h2>
									<Button
										color="var(--cor primaria)"
										type="button"
										on:click={() => {
											onRemoveCriterio(criterio);
										}}>X</Button
									>
								</div>
								<hr />
							{/each}
							<h2 class="total-de-pontos">
								Total de pontos:&emsp;
								{#if etapas[$selectedEtapa].criterios.length === 0}
									0.00
								{:else}
									{parseFloat(
										etapas[$selectedEtapa].criterios.map((x) => x.nota_max).reduce((a, b) => a + b)
									).toFixed(2)}
								{/if}
								pts
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
