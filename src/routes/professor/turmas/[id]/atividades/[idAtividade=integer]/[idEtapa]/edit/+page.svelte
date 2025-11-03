<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import InputNumber from '$lib/components/InputText.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO, REALIZACAO, LIMITE_DE_PONTOS_DA_ETAPA } from '$lib/constants';
	import selectedEtapa from '$src/stores/selectedEtapa.js';
	import { etapas } from '$src/stores/etapas';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { FORMACAO_GRUPO } from '$lib/constants';
	import { debug } from '$lib/utils/logger';

	// export let data;
	let { data } = $props();

	const atividade = data.atividade;
	const etapa = data.etapa;
	etapa.data_entrega_inicial = showISOAsGMT4(etapa.data_entrega_inicial);
	etapa.data_entrega_final = showISOAsGMT4(etapa.data_entrega_final);

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
	// 		etapa.criterios = [];
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
			const etapaObj = {
				id: etapa.id,
				titulo: etapa.titulo,
				descricao: etapa.descricao,
				data_entrega_inicial: etapa.data_entrega_inicial,
				data_entrega_final: etapa.data_entrega_final,
				receber_apos_prazo: etapa.receber_apos_prazo
			};
			formData.set('etapa', JSON.stringify(etapaObj));

			return true;
		}

		return false;
	}

	function validaFormulario() {
		let titulo = etapa.titulo;
		if (titulo === '') throw new Error('Título vazio');

		// for (const etapa of etapasData) {
		let dataInicial = etapa.data_entrega_inicial;
		let dataFinal = etapa.data_entrega_final;
		let tituloEtapa = etapa.titulo;

		if (!isValidDate(dataInicial)) throw new Error(`Data inicial inválida (Etapa: ${tituloEtapa})`);

		if (!isValidDate(dataFinal)) throw new Error(`Data final inválida (Etapa: ${tituloEtapa})`);
		// }

		return true;
	}

	function onAdicionaCriterio() {
		if (
			!novoCriterioTitulo ||
			!novoCriterioNota ||
			(etapa.atribuicaoNotasGroup == 'Média Ponderada' && !novoCriterioPeso)
		) {
			console.error('Definir critério: Dados incompletos');
			const textErro =
				etapa.atribuicaoNotasGroup == 'Média Ponderada'
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
		if (etapa.criterios.length !== 0) {
			totalPontos = etapa.criterios.map((elem) => elem.nota_max).reduce((i, acc) => acc + i);
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

		if (etapa.criterios.length !== 0) {
			etapa.criterios = [...etapa.criterios, novoCriterio];
		} else {
			etapa.criterios = [novoCriterio];
		}

		novoCriterioTitulo = '';
		novoCriterioNota = '';
		novoCriterioDescricao = '';
		novoCriterioPeso = '';
	}

	function onRemoveCriterio(criterio) {
		etapa.criterios = etapa.criterios.filter((elem) => {
			return elem !== criterio;
		});
	}

	function onRemoveFormacao(formacao) {
		etapa.formacoes = etapa.formacoes.filter((elem) => {
			return elem !== formacao;
		});
	}

	function isValidDate(dateStr) {
		return !isNaN(new Date(dateStr));
	}

	function formatarNota(valor) {
		let digitsOnly = String(valor).replace(/\D/g, '');

		if (!digitsOnly) {
			return '';
		}

		let formattedValue;

		if (digitsOnly.length >= 3 && digitsOnly.startsWith('100')) {
			formattedValue = '10.0';
		} else if (digitsOnly.length >= 2 && digitsOnly.startsWith('10')) {
			formattedValue = '10';
		} else if (digitsOnly.length >= 2) {
			formattedValue = digitsOnly.charAt(0) + '.' + digitsOnly.substring(1, 2);
		} else {
			formattedValue = digitsOnly;
		}

		return formattedValue;
	}

	function onChangeCriterioNota() {
		novoCriterioNota = formatarNota(novoCriterioNota);

		if (parseFloat(novoCriterioNota) > 10.0 || novoCriterioNota === '0.0') {
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
		etapa.formacoes = [
			...etapa.formacoes,
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
		etapa.criterios = [];
		showModal = false;
		etapa.atribuicaoNotasGroup = proximoValor;
	}

	function handleRealizaoEtapa(valor) {
		etapa.realizacaoGroup = valor.trim();
	}

	function handleTipoAvaliacao(valor) {
		etapa.tipoAvaliacaoNotasGroup = valor.trim();
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

	function getTipoAtribuicao(id) {
		return id == 1 ? 'Média Simples' : 'Média Ponderada';
	}

	function getTipoRealizacao(emGrupos) {
		return !emGrupos ? 'Individual' : 'Em Grupos';
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
			atividade.prazo = showISOAsGMT4(atividade.prazo);
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
								<InputText id="inputTituloEtapa" borded bind:value={etapa.titulo} name="titulo" />
							</div>
							<div class="row">
								<h2>Descrição:</h2>
								<InputTextArea
									id="inputDescricaoEtapa"
									borded
									bind:value={etapa.descricao}
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
									bind:value={etapa.data_entrega_inicial}
									name="dtEntregaMin"
									min={Date.now()}
									max={atividade.prazo}
								/>
							</div>
							<div class="row">
								<h2>Data máxima de entrega:</h2>
								<!-- TODO: Adicionar limite maximo sendo a data de entrega da atividade pai -->
								<InputDatetime
									id="inputDtFimEtapa"
									borded
									bind:value={etapa.data_entrega_final}
									name="dtEntregaMax"
									min={etapa.data_entrega_inicial}
									max={atividade.prazo}
								/>
							</div>
							<div class="row">
								<InputCheckbox
									id="inputReceberAposPrazoEtapa"
									bind:checked={etapa.receber_apos_prazo}
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
									selected={getTipoAtribuicao(etapa.tipo_atribuicao_nota)}
									onClickOption={handleAtribuicaoDeNotas}
									requerConfirmacao
									disabled
								/>
							</div>
							<hr />
							<div class="row">
								<h2>Realização:</h2>
								<InputRadio
									borded
									options={realizacaoOpcoes}
									selected={getTipoRealizacao(etapa.tipo_realizacao)}
									onClickOption={handleRealizaoEtapa}
									disabled
								/>
							</div>
							<hr />
							{#if etapa.realizacaoGroup == 'Em Grupos'}
								<div class="row">
									<h2>Tipo de Avaliação</h2>
									<InputRadio
										id="inputTipoAvaliacaoNotas"
										borded
										options={tipoAvaliacaoOpcoes}
										selected={etapa.tipoAvaliacaoNotasGroup}
										onClickOption={handleTipoAvaliacao}
										disabled
									/>
								</div>
								<hr />
								<div class="row">
									<h2>Formação dos grupos:</h2>
									<InputRadio
										id="formacaoGrupos"
										borded
										options={formacaoGrupoOpcoes}
										selected={etapa.formacao}
										disabled
										onClickOption={(valor) => {
											etapa.formacao = valor.trim();
										}}
									/>
								</div>
								<hr />
								<div class="tamanho-grupos">
									<h2>Tamanho dos grupos:</h2>
									{#each etapa.formacoes as formacao, index}
										<div class="row">
											<p>{index + 1}.</p>
											<InputText
												id="inputNGruposEtapa{index}"
												borded
												width="24px"
												padding="10px"
												fontWeight="500"
												disabled
												bind:value={etapa.formacoes[index].nGrupos}
												name="nGrupos"
											/>
											<p>Grupos de</p>
											<InputText
												id="inputNAluno{index}"
												borded
												width="24px"
												padding="10px"
												fontWeight="500"
												disabled
												bind:value={etapa.formacoes[index].nAlunos}
												name="nAluno"
											/>
											<p>alunos</p>
											{#if etapa.formacoes.length > 1}
												<Button
													id="btnRemoveFormacaoEtapa{index}"
													color="var(--cor primaria)"
													type="button"
													disabled
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
							<h1 style="align-text: left; width: 100%">Critérios</h1>
							<div class="column inputs-criterio">
								<div class="row">
									<Button disabled type="button" on:click={() => (isModalOpen = true)}>
										Copiar critérios de outra etapa</Button
									>
								</div>
								{#each etapa?.criterios as criterio, index (index)}
									<div class="column input-criterio">
										<div class="row">
											<InputText
												id="inputTituloCriterio-{index}"
												borded
												name="tituloCriterio"
												placeholder="Título"
												bind:value={criterio.titulo}
												disabled
											/>
											<InputNumber
												id="inputNotaMaxCriterio-{index}"
												borded
												name="notaMaxCriterio"
												width="150px"
												placeholder="Nota max."
												bind:value={criterio.pontuacao_max}
												on:focus={() => onNotaFocus(criterio.pontuacao_max, index)}
												on:input={() => onChangeCriterioNota(index)}
												disabled
											/>
											{#if etapa?.atribuicaoNotasGroup == 'Média Ponderada'}
												<InputNumber
													id="inputPesoCriterio-{index}"
													borded
													name="pesoCriterio"
													width="150px"
													placeholder="Peso"
													bind:value={criterio.peso}
													on:focus={() => onPesoFocus(criterio.peso, index)}
													on:input={() => onChangeCriterioPeso(index)}
													disabled
												/>
											{/if}
											<!-- {#if index > 0} -->
											<!-- 	<Button -->
											<!-- 		color="var(--cor primaria)" -->
											<!-- 		backgroundColor="var(--cor-secundaria)" -->
											<!-- 		type="button" -->
											<!-- 		disabled -->
											<!-- 		on:click={() => onRemoveCriterio(criterio)}>X</Button -->
											<!-- 	> -->
											<!-- {/if} -->
										</div>
										<div class="row">
											<InputText
												id="inputDescricaoCriterio-{index}"
												borded
												name="descricaoCriterio"
												placeholder="Descrição"
												bind:value={criterio.descricao}
												disabled
											/>
										</div>
									</div>
									<!-- <hr /> -->
								{/each}
								<!-- <div class="btn-add-criterio"> -->
								<!-- 	<Button -->
								<!-- 		borded -->
								<!-- 		color="var(--cor primaria)" -->
								<!-- 		backgroundColor="var(--cor-secundaria)" -->
								<!-- 		type="button" -->
								<!-- 		on:click={onAdicionaCriterio}>Adicionar Critério</Button -->
								<!-- 	> -->
								<!-- </div> -->
								<div class="criterios-definidos">
									<div class="pontuacao">
										<div class="total-de-pontos">
											<h2>Número de critérios:&emsp;</h2>
											<h2>
												{etapa.criterios.length}
											</h2>
										</div>
										{#if etapa.atribuicaoNotasGroup === 'Média Ponderada'}
											<div class="total-de-pontos">
												<h2>Soma de (cada nota × seu peso):&emsp;</h2>
												<h2>
													{parseFloat(
														etapa?.criterios
															.map((x) => x)
															.reduce((a, b) => a + b.pontuacao_max * b.peso, 0)
													).toFixed(1)}
												</h2>
											</div>
											<div class="total-de-pesos">
												<h2>Total de pesos:&emsp;</h2>
												<h2>
													{parseFloat(
														etapa?.criterios
															.map((x) => parseFloat(x.peso) || 0)
															.reduce((a, b) => a + b, 0)
													).toFixed(1)}
												</h2>
											</div>
										{:else}
											<div class="total-de-pontos">
												<h2>Total de pontos:&emsp;</h2>
												<h2>
													{parseFloat(
														etapa?.criterios
															.map((x) => parseFloat(x.pontuacao_max) || 0)
															.reduce((a, b) => a + b, 0)
													).toFixed(1)}
												</h2>
											</div>
										{/if}
										<br />
										<div class="total-de-pontos">
											<h1>Média final: &emsp;</h1>
											{#if etapa.atribuicaoNotasGroup === 'Média Ponderada'}
												<h1>
													{#if etapa?.criterios[0].pontuacao_max == '' || etapa?.criterios[0].peso == ''}
														0.0
													{:else}
														{(
															parseFloat(
																etapa?.criterios
																	.map((x) => x)
																	.reduce((a, b) => a + b.pontuacao_max * b.peso, 0)
															) /
															parseFloat(
																etapa?.criterios
																	.map((x) => parseFloat(x.peso) || 0)
																	.reduce((a, b) => a + b, 0)
															)
														).toFixed(1)}
													{/if}
												</h1>
											{:else}
												<h1>
													{parseFloat(
														etapa?.criterios
															.map((x) => parseFloat(x.pontuacao_max) || 0)
															.reduce((a, b) => a + b, 0) / etapa?.criterios.length
													).toFixed(1)}
												</h1>
											{/if}
										</div>

										{#if etapa.atribuicaoNotasGroup === 'Média Ponderada'}
											<h3 style="align-self: center;">
												&emsp;(Soma de (cada nota × seu peso)) / (Total de pesos)
											</h3>
										{:else}
											<h3 style="align-self: center;">
												&emsp;(Total de pontos / Número de critérios)
											</h3>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>
					<Button type="submit" color="var(--text-1)" backgroundColor="var(--cor-secundaria)"
						>Salvar</Button
					>
					<!-- TODO: Botão de voltar -->
					<!-- <Button type="submit" color="var(--text-1)" backgroundColor="var(--cor-secundaria)" -->
					<!-- 	>Próximo</Button -->
					<!-- > -->
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
		justify-content: center;
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
		justify-content: left;
		gap: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.info-container {
		display: flex;
		flex-direction: column;
		align-items: left;
		justify-content: start;
		margin-top: 40px;
		margin-right: 24px;
	}

	.info-container hr {
		width: 100%;
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
		gap: 20px; /* Reduzido o gap para acomodar melhor os itens */
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
		margin-top: 20px; /* Adicionado espaço acima da pontuação */
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

	.caminho-de-pao-criacao {
		margin-left: 128px;
		margin-top: 24px;
		color: gray;
		font-size: 24px;
		display: flex;
		flex-direction: row;
	}

	.caminho-de-pao-criacao b {
		color: var(--cor-primaria);
	}

	.inputs-criterio {
		gap: 20px;
	}

	.input-criterio {
		padding: 0px 8px;
		border: 2px solid var(--cor-secundaria);
		border-radius: 12px;
		background-color: lightgray;
	}
</style>
