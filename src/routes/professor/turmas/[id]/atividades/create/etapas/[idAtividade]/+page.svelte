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
	import { Toaster, toast } from 'svelte-sonner';
	import InputNumber from '$lib/components/InputNumber.svelte';

	// export let data;

	let novoCriterioTitulo = '';
	let novoCriterioNota = '';
	let novoCriterioDescricao = '';
	let oldCriterioNota = '';
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

	function onSubmit(formData) {
		let titulo = etapas[$selectedEtapa].titulo;
		if (titulo === '') throw new Error('Título vazio');

		let realizacao = etapas[$selectedEtapa].realizacaoGroup;
		let atribuicaoNotas = etapas[$selectedEtapa].atribuicaoNotasGroup;
		realizacao = realizacao === 'Individual' ? REALIZACAO.individual : REALIZACAO.grupos;
		atribuicaoNotas =
			atribuicaoNotas === 'Média Simples' ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada;

		let criterios = etapas[$selectedEtapa].criterios;
		if (criterios.length === 0) throw new Error('Etapa sem critérios definidos.');

		let notaMax = etapas[$selectedEtapa].criterios
			.map((criterio) => parseFloat(criterio.nota_max))
			.reduce((item, acc) => item + acc);
		if (notaMax > LIMITE_DE_PONTOS_DA_ETAPA)
			throw new Error('Nota total passa o limite de ${LIMITE_DE_PONTOS_DA_ETAPA} pontos');

		let dataInicial = etapas[$selectedEtapa].dtEntregaMin;
		let dataFinal = etapas[$selectedEtapa].dtEntregaMax;
		if (!isValidDate(dataInicial)) throw new Error('Data inicial inválida');
		if (!isValidDate(dataFinal)) throw new Error('Data final inválida');

		// TODO: Formatar dados para que envie todas as etapas ao mesmo tempo

		formData.set('etapas', JSON.stringify(etapas));

		return true;
	}

	function onAdicionaCriterio() {
		if (!novoCriterioTitulo || !novoCriterioNota) {
			console.error('Definir critério: Dados incompletos');
			erroNotaCriterio = [true, `*Digite o título e a nota`];
			return;
		}

		if (Number(novoCriterioNota) === novoCriterioNota && Number(novoCriterioNota) <= 10.0) {
			console.error('Definir critério: Nota no formato inválido');
			erroNotaCriterio = [true, `*Formato inválido`];
			return;
		}

		let novoCriterio = {
			titulo: novoCriterioTitulo,
			descricao: novoCriterioDescricao,
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
			etapas[$selectedEtapa].criterios = [...etapas[$selectedEtapa].criterios, novoCriterio];
		} else {
			etapas[$selectedEtapa].criterios = [novoCriterio];
		}

		novoCriterioTitulo = '';
		novoCriterioNota = '';
		novoCriterioDescricao = '';
	}

	function onRemoveCriterio(criterio) {
		etapas[$selectedEtapa].criterios = etapas[$selectedEtapa].criterios.filter((elem) => {
			return elem !== criterio;
		});
	}

	function isValidDate(dateStr) {
		return !isNaN(new Date(dateStr));
	}

	function onChangeCriterioNota() {
		// Máscara de input (0.0 [max: 10.0])
		novoCriterioNota = String(novoCriterioNota)
			.replace(/(?<=^[0-9]{1})[0-9]$/g, '.$&')
			.replace(/(?<=^[0-9])(\.)([0-9])([0-9])$/g, '$2$1$3')
			.replace(/(?<=^[0-9]{2})\.$/g, '')
			.replace(/(?<=^[0-9])\.$/g, '')
			.replace(/(?<=^[0-9]{1,2}\.0{1})0*$/g, '')
			.replace(/^(1)(0)$/g, '$1.$2');

		if (parseFloat(novoCriterioNota) > 10.0) {
			novoCriterioNota = oldCriterioNota;
		} else {
			oldCriterioNota = novoCriterioNota;
		}
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

<Toaster richColors expand position="top-center" closeButton />
<div class="page-container">
	<EtapasBarraLateral bind:etapas bind:selectedEtapa={$selectedEtapa} />
	<div class="content-container">
		<h1>Calculados</h1>
		<h2>Definição das etapas da atividade</h2>
		<div class="form-container">
			<form
				class="cria-etapa-form"
				method="post"
				use:enhance={({ formData, cancel }) => {
					let res;
					try {
						res = onSubmit(formData);
					} catch (e) {
						toast.error(`${e.message}`);
						cancel();
					}

					if (!res /* || form?.already_registered */) {
						cancel();
					}

					return async ({ result, update }) => {
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
								<div class="column">
									<div class="row">
										<InputText
											borded
											name="titulo-criterio"
											placeholder="Título"
											bind:value={novoCriterioTitulo}
										/>
										<InputText
											borded
											name="nota-max-criterio"
											width="150px"
											placeholder="Nota max."
											inputHandler={onChangeCriterioNota}
											bind:value={novoCriterioNota}
										/>
									</div>
									<div class="row">
										<InputText
											borded
											name="descricao-criterio"
											placeholder="Descrição"
											bind:value={novoCriterioDescricao}
										/>
									</div>
									<div class="btn-add-criterio">
										<Button
											borded
											color="var(--cor primaria)"
											backgroundColor="var(--cor-secundaria)"
											type="button"
											on:click={onAdicionaCriterio}>Adicionar Critério</Button
										>
									</div>
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
									<div class="titulo-criterio">
										<h2>{criterio.titulo}</h2>
										<IconeInformacao text={criterio.descricao} />
									</div>
									<h2>{parseFloat(criterio.nota_max).toFixed(2)}</h2>
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
										etapas[$selectedEtapa].criterios
											.map((x) => parseFloat(x.nota_max))
											.reduce((a, b) => a + b)
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

<style scoped>
	.page-container {
		padding: 24px;
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
		margin-right: 24px;
	}

	.criterios-container {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 60px;
		padding-left: 24px;
		border-left: 1px solid black;
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

	.btn-add-criterio {
		display: flex;
		justify-content: center;
		margin-top: 24px;
	}

	.titulo-criterio {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}
</style>
