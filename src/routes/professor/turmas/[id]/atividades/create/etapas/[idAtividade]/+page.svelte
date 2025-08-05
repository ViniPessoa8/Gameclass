<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import InputNumber from '$lib/components/InputText.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import EtapasBarraLateral from '$lib/components/EtapasBarraLateral.svelte';
	import Modal from '$lib/components/Modal.svelte';
	// import Tags from 'svelte-tags-input';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO, REALIZACAO, LIMITE_DE_PONTOS_DA_ETAPA } from '$lib/constants';
	import selectedEtapa from '$src/stores/selectedEtapa.js';
	import { etapas } from '$src/stores/etapas';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { FORMACAO_GRUPO } from '../../../../../../../../lib/constants';

	// export let data;
	let { data } = $props();
	console.debug('data=>', data);

	let novoCriterioTitulo = $state('');
	let novoCriterioNota = $state('');
	let novoCriterioDescricao = $state('');
	let novoCriterioPeso = $state('');
	let oldCriterioNota = $state('');
	let oldCriterioPeso = $state('');
	let erroNotaCriterio = $state(false);
	let etapasData = $state([]);
	let carregando = $state(true);
	// let tags = [];
	// let tagsAutocomplete = [];
	// let tagsColors = {};

	let realizacaoOpcoes = $state();
	let atribuicaoOpcoes = $state();
	let tipoAvaliacaoOpcoes = $state();
	let formacaoGrupoOpcoes = $state();
	let formacoesGrupo = $state();
	let showModal = $state(false);
	let proximoValor = $state();

	// $: {
	// 	if (atribuicaoOpcoes) {
	// 		console.debug('ENTROU', atribuicaoOpcoes);
	// 		etapasData[$selectedEtapa].criterios = [];
	// 	}
	// }

	if (!$selectedEtapa) {
		$selectedEtapa = 0;
	}

	function showISOAsGMT4(isoUTC) {
		const offsetMinutes = -4 * 60; // GMT-4
		const utcDate = new Date(isoUTC);
		const localDate = new Date(utcDate.getTime() + offsetMinutes * 60000);
		const datetimeLocal = localDate.toISOString().slice(0, 16);

		return datetimeLocal;
	}

	function onSubmit(formData) {
		if (validaFormulario()) {
			formData.set('etapas', JSON.stringify(etapasData));
			$etapas = etapasData;
			sessionStorage.setItem('etapas', JSON.stringify(etapasData));

			return true;
		}

		return false;
	}

	function validaFormulario() {
		let titulo = etapasData[$selectedEtapa].titulo;
		if (titulo === '') throw new Error('Título vazio');

		let realizacao = etapasData[$selectedEtapa].realizacaoGroup;
		let atribuicaoNotas = etapasData[$selectedEtapa].atribuicaoNotasGroup;
		realizacao = realizacao === 'Individual' ? REALIZACAO.individual : REALIZACAO.grupos;
		atribuicaoNotas =
			atribuicaoNotas === 'Média Simples' ? ATRIBUICAO.media_simples : ATRIBUICAO.media_ponderada;

		let criterios = etapasData[$selectedEtapa].criterios;
		if (criterios.length === 0) throw new Error('Etapa sem critérios definidos.');

		let notaMax = etapasData[$selectedEtapa].criterios
			.map((criterio) => parseFloat(criterio.nota_max))
			.reduce((item, acc) => item + acc);
		if (notaMax > LIMITE_DE_PONTOS_DA_ETAPA)
			throw new Error('Nota total passa o limite de ${LIMITE_DE_PONTOS_DA_ETAPA} pontos');

		for (const etapa of etapasData) {
			let dataInicial = etapa.dtEntregaMin;
			let dataFinal = etapa.dtEntregaMax;
			let tituloEtapa = etapa.titulo;
			let realizacao = etapa.realizacaoGroup;
			let formacoes = JSON.parse(JSON.stringify(etapa.formacoes));

			if (!isValidDate(dataInicial))
				throw new Error(`Data inicial inválida (Etapa "${tituloEtapa}")`);

			if (!isValidDate(dataFinal)) throw new Error(`Data final inválida (Etapa "${tituloEtapa}")`);

			// Formação de grupos da etapa
			const filter = formacoes.filter((e) => e.nGrupos === null && realizacao == 'Em Grupos');
			if (filter.length > 0) {
				throw new Error(`Formação de grupos com dados incompletos`);
			}
		}

		return true;
	}

	function onAdicionaCriterio() {
		if (
			!novoCriterioTitulo ||
			!novoCriterioNota ||
			(etapasData[$selectedEtapa].atribuicaoNotasGroup == 'Média Ponderada' && !novoCriterioPeso)
		) {
			console.error('Definir critério: Dados incompletos');
			const textErro =
				etapasData[$selectedEtapa].atribuicaoNotasGroup == 'Média Ponderada'
					? '*Digite o título, a nota e o peso'
					: '*Digite o título e a nota';
			erroNotaCriterio = [true, textErro];
			return;
		}

		if (Number(novoCriterioNota) === novoCriterioNota && Number(novoCriterioNota) <= 10.0) {
			console.error('Definir critério: Nota no formato inválido');
			erroNotaCriterio = [true, `*Formato inválido`];
			return;
		}

		if (Number(novoCriterioPeso) === novoCriterioNota && Number(novoCriterioNota) <= 10.0) {
			console.error('Definir critério: Nota no formato inválido');
			erroNotaCriterio = [true, `*Formato inválido`];
			return;
		}

		let novoCriterio = {
			titulo: novoCriterioTitulo,
			descricao: novoCriterioDescricao,
			nota_max: novoCriterioNota,
			peso: novoCriterioPeso
		};

		let totalPontos;
		if (etapasData[$selectedEtapa].criterios.length !== 0) {
			totalPontos = etapasData[$selectedEtapa].criterios
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

		if (etapasData[$selectedEtapa].criterios.length !== 0) {
			etapasData[$selectedEtapa].criterios = [
				...etapasData[$selectedEtapa].criterios,
				novoCriterio
			];
		} else {
			etapasData[$selectedEtapa].criterios = [novoCriterio];
		}

		novoCriterioTitulo = '';
		novoCriterioNota = '';
		novoCriterioDescricao = '';
		novoCriterioPeso = '';
	}

	function onRemoveCriterio(criterio) {
		etapasData[$selectedEtapa].criterios = etapasData[$selectedEtapa].criterios.filter((elem) => {
			return elem !== criterio;
		});
	}

	function onRemoveFormacao(formacao) {
		etapasData[$selectedEtapa].formacoes = etapasData[$selectedEtapa].formacoes.filter((elem) => {
			return elem !== formacao;
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
			.replace(/^(1)(0)$/g, '$1.$2')
			.replace(/[^\d.]/g, ''); // Remove tudo que não for número

		if (parseFloat(novoCriterioNota) > 10.0) {
			novoCriterioNota = oldCriterioNota;
		} else {
			oldCriterioNota = novoCriterioNota;
		}
	}

	function onChangeCriterioPeso() {
		novoCriterioPeso = String(novoCriterioPeso)
			.replace(/\D/g, '') // remove tudo que não for dígito
			.replace(/^0+/, ''); // remove zeros à esquerda

		if (parseFloat(novoCriterioPeso) > 10) {
			novoCriterioPeso = 10;
		} else {
			oldCriterioPeso = novoCriterioPeso;
		}
	}

	function onAdicionaFormacao() {
		etapasData[$selectedEtapa].formacoes = [
			...etapasData[$selectedEtapa].formacoes,
			{
				nGrupos: null,
				nAlunos: null
			}
		];
	}

	function handleAtribuicaoDeNotas(valor) {
		proximoValor = valor;
		showModal = true;
	}

	function confirmaModalAtribuicaoDeNotas() {
		etapasData[$selectedEtapa].criterios = [];
		showModal = false;
		etapasData[$selectedEtapa].atribuicaoNotasGroup = proximoValor;
	}

	function handleRealizaoEtapa(valor) {
		etapasData[$selectedEtapa].realizacaoGroup = valor.trim();
	}

	function handleTipoAvaliacao(valor) {
		etapasData[$selectedEtapa].tipoAvaliacaoNotasGroup = valor.trim();
	}

	// function onTagAdicionada(tag, index) {
	// 	tagsColors[tag] = 'black';
	// }
	//
	// function onTagRemovida() {
	// 	// remove a cor correspondente no dicionario de cores
	// 	let tagsColorsKeys = Object.keys(tagsColors);
	// 	tagsColorsKeys.forEach((tagKey) => {
	// 		if (!tags.includes(tagKey)) {
	// 			delete tagsColors[tagKey];
	// 		}
	// 	});
	// }

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

		tipoAvaliacaoOpcoes = [
			{ name: 'avaliacao_individual', text: 'Individual' },
			{ name: 'avaliacao_grupos', text: 'Em Grupos' }
		];

		formacaoGrupoOpcoes = [
			{ name: FORMACAO_GRUPO.alunos_convidam, text: 'Alunos criam seus grupos' },
			{ name: FORMACAO_GRUPO.professor_escolhe, text: 'Professor forma os grupos' },
			{ name: FORMACAO_GRUPO.aleatorio, text: 'Aleatório' }
		];

		formacoesGrupo = [
			{
				nGrupos: null,
				nAlunos: null
			}
		];

		const unsubscribe = etapas.subscribe((valor) => {
			if (valor.length > 0) {
				etapasData = valor;
			} else {
				const dateNow = new Date();
				const dateNowFormated = showISOAsGMT4(dateNow);
				etapasData = [
					{
						id: 1,
						titulo: '',
						descricao: '',
						dtEntregaMin: dateNowFormated,
						dtEntregaMax: '', // TODO: Validar campo
						realizacaoGroup: 'Individual',
						atribuicaoNotasGroup: 'Média Simples',
						tipoAvaliacaoNotasGroup: 'Individual',
						formacao: 'Alunos criam seus grupos',
						receberAposPrazo: true,
						criterios: [],
						formacoes: [
							{
								nGrupos: null,
								nAlunos: null
							}
						]
					}
				];
			}
			carregando = false;
		});

		return unsubscribe; // limpa quando sair da página
	});
</script>

<Modal
	visible={showModal}
	title="Atenção"
	message="Alterar a atribuição de notas irá remover os critérios existentes. Deseja continuar?"
	buttons={[
		{
			label: 'Sim',
			onClick: () => {
				confirmaModalAtribuicaoDeNotas();
			},
			color: 'green'
		},
		{
			label: 'Não',
			onClick: () => {
				showModal = false;
			},
			color: 'red'
		}
	]}
/>
<Toaster richColors expand position="top-center" closeButton />
{#if !carregando}
	<div class="page-container">
		<!-- <EtapasBarraLateral bind:etapas={etapasData} bind:selectedEtapa={$selectedEtapa} /> -->
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
								<InputText
									id="inputTituloEtapa"
									borded
									bind:value={etapasData[$selectedEtapa].titulo}
									name="titulo"
								/>
							</div>
							<div class="row">
								<h2>Descrição:</h2>
								<InputTextArea
									id="inputDescricaoEtapa"
									borded
									bind:value={etapasData[$selectedEtapa].descricao}
									name="descricao"
									width="400px"
									height="150px"
								/>
							</div>
							<div class="row">
								<h2>Data de início:</h2>
								<InputDatetime
									id="inputDtInicioEtapa"
									borded
									bind:value={etapasData[$selectedEtapa].dtEntregaMin}
									name="dtEntregaMin"
									min={etapasData[$selectedEtapa].dtEntregaMin}
								/>
							</div>
							<div class="row">
								<h2>Data máxima de entrega:</h2>
								<!-- TODO: Adicionar limite maximo sendo a data de entrega da atividade pai -->
								<InputDatetime
									id="inputDtFimEtapa"
									borded
									bind:value={etapasData[$selectedEtapa].dtEntregaMax}
									name="dtEntregaMax"
									min={etapasData[$selectedEtapa].dtEntregaMin}
								/>
							</div>
							<div class="row">
								<InputCheckbox
									id="inputReceberAposPrazoEtapa"
									bind:checked={etapasData[$selectedEtapa].receberAposPrazo}
									text="Receber após o prazo"
								/>
								<IconeInformacao text="Receber a tarefa mesmo que o prazo final tenha passado." />
							</div>
							<hr />
							<div class="row">
								<h2>Atribuição de Notas:</h2>
								<InputRadio
									id="inputAtribuicaoNotasEtapa"
									borded
									options={atribuicaoOpcoes}
									selected={etapasData[$selectedEtapa].atribuicaoNotasGroup}
									onClickOption={handleAtribuicaoDeNotas}
									requerConfirmacao
								/>
							</div>
							<hr />
							<div class="row">
								<h2>Realização:</h2>
								<InputRadio
									borded
									options={realizacaoOpcoes}
									selected={etapasData[$selectedEtapa].realizacaoGroup}
									onClickOption={handleRealizaoEtapa}
								/>
							</div>
							<hr />
							{#if etapasData[$selectedEtapa].realizacaoGroup == 'Em Grupos'}
								<div class="row">
									<h2>Tipo de Avaliação</h2>
									<InputRadio
										id="inputTipoAvaliacaoNotas"
										borded
										options={tipoAvaliacaoOpcoes}
										selected={etapasData[$selectedEtapa].tipoAvaliacaoNotasGroup}
										onClickOption={handleTipoAvaliacao}
									/>
								</div>
								<hr />
								<div class="row">
									<h2>Formação dos grupos:</h2>
									<InputRadio
										borded
										options={formacaoGrupoOpcoes}
										selected={etapasData[$selectedEtapa].formacao}
										onClickOption={(valor) => {
											etapasData[$selectedEtapa].formacao = valor.trim();
										}}
									/>
								</div>
								<hr />
								<div class="tamanho-grupos">
									<h2>Tamanho dos grupos:</h2>
									{#each etapasData[$selectedEtapa].formacoes as formacao, index}
										<div class="row">
											<p>{index + 1}.</p>
											<InputText
												id="inputNGruposEtapa{index}"
												borded
												width="24px"
												padding="10px"
												fontWeight="500"
												bind:value={etapasData[$selectedEtapa].formacoes[index].nGrupos}
												name="nGrupos"
											/>
											<p>Grupos de</p>
											<InputText
												id="inputNAluno{index}"
												borded
												width="24px"
												padding="10px"
												fontWeight="500"
												bind:value={etapasData[$selectedEtapa].formacoes[index].nAlunos}
												name="nAluno"
											/>
											<p>alunos</p>
											{#if etapasData[$selectedEtapa].formacoes.length > 1}
												<Button
													id="btnRemoveFormacaoEtapa{index}"
													color="var(--cor primaria)"
													type="button"
													on:click={() => {
														onRemoveFormacao(formacao);
													}}>X</Button
												>
											{/if}
										</div>
									{/each}
									<div class="btn-add-formacao">
										<Button
											borded
											color="var(--cor primaria)"
											backgroundColor="var(--cor-secundaria)"
											type="button"
											fontSize="20px"
											fontWeight="500"
											on:click={onAdicionaFormacao}>Nova Formação</Button
										>
									</div>
								</div>
							{/if}
							<!-- Tags -->
							<!-- <div class="row"> -->
							<!-- 	<h3>Tags:</h3> -->
							<!-- 	<!-- TODO Make Tag style editable (https://svelte-tags-input.vercel.app/#:~:text=How%20to%20override%20default%20styles%3F) -->
							<!-- -->
							<!-- 	<!-- TODO Generate random colors -->
							<!-- 	<Tags -->
							<!-- 		bind:tags -->
							<!-- 		maxTags={5} -->
							<!-- 		onlyUnique={true} -->
							<!-- 		onTagAdded={onTagAdicionada} -->
							<!-- 		onTagRemoved={onTagRemovida} -->
							<!-- 	/> -->
							<!-- </div> -->
						</div>
						<div class="criterios-container">
							<h1>Critérios</h1>
							<div class="column">
								<!-- TODO: Limitar input de dados com mascaras  -->
								<div class="column">
									<div class="row">
										<InputText
											id="inputTituloCriterio"
											borded
											name="tituloCriterio"
											placeholder="Título"
											bind:value={novoCriterioTitulo}
										/>
										<InputNumber
											id="inputNotaMaxCriterio"
											borded
											name="notaMaxCriterio"
											width="150px"
											placeholder="Nota max."
											inputHandler={onChangeCriterioNota}
											bind:value={novoCriterioNota}
										/>
										{#if etapasData[$selectedEtapa].atribuicaoNotasGroup == 'Média Ponderada'}
											<InputText
												id="inputPesoCriterio"
												borded
												name="pesoCriterio"
												width="150px"
												placeholder="Peso"
												inputHandler={onChangeCriterioPeso}
												bind:value={novoCriterioPeso}
											/>
										{/if}
									</div>
									<div class="row">
										<InputText
											id="inputDescricaoCriterio"
											borded
											name="descricaoCriterio"
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
							<div class="criterios-definidos">
								<hr />
								{#each etapasData[$selectedEtapa].criterios as criterio}
									<div class="criterio-container">
										<div class="titulo-criterio">
											<h2>{criterio.titulo}</h2>
											<IconeInformacao text={criterio.descricao} />
										</div>
										<h2>{parseFloat(criterio.nota_max).toFixed(1)}</h2>
										{#if etapasData[$selectedEtapa].atribuicaoNotasGroup == 'Média Ponderada'}
											<h2>{parseFloat(criterio.peso).toFixed(1)}</h2>
										{/if}
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
								<div class="pontuacao">
									<div class="total-de-pontos">
										<h2>Total de pontos:&emsp;</h2>
										<h2>
											{#if etapasData[$selectedEtapa].criterios.length === 0}
												0.0
											{:else}
												{parseFloat(
													etapasData[$selectedEtapa].criterios
														.map((x) => parseFloat(x.nota_max))
														.reduce((a, b) => a + b)
												).toFixed(1)}
											{/if}
										</h2>
									</div>
									{#if etapasData[$selectedEtapa].atribuicaoNotasGroup === 'Média Ponderada'}
										<div class="total-de-pesos">
											<h2>Total de pesos:&emsp;</h2>
											<h2>
												{#if etapasData[$selectedEtapa].criterios.length === 0}
													0.0
												{:else}
													{parseFloat(
														etapasData[$selectedEtapa].criterios
															.map((x) => parseFloat(x.peso))
															.reduce((a, b) => a + b)
													).toFixed(1)}
												{/if}
											</h2>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
					<Button type="submit" color="var(--text-1)" backgroundColor="var(--cor-secundaria)"
						>Próximo</Button
					>
				</form>
			</div>
		</div>
	</div>
{/if}

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
		gap: 2em;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
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
		justify-content: center;
		margin-top: 40px;
		margin-right: 24px;
	}

	.info-container hr {
		width: 90%;
		height: 1px;
		border: 0;
		border-top: 1px solid darkgrey;
		background-color: #dddddd;
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

	.pontuacao {
		display: flex;
		flex-direction: column;
	}

	.total-de-pontos,
	.total-de-pesos {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 6px;
	}

	.tamanho-grupos {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		text-align: center;
		gap: 12px;
	}

	.tamanho-grupos > .row {
		font-size: 24px;
	}

	.btn-add-formacao {
		display: flex;
		justify-content: center;
	}
</style>
