<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import InputNumber from '$lib/components/InputNumber.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import EtapasBarraLateral from '$lib/components/EtapasBarraLateral.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ModalImportarCriterios from '$lib/components/ModalImportarCriterios.svelte';
	// import Tags from 'svelte-tags-input';
	import { enhance } from '$app/forms';
	import { ATRIBUICAO, REALIZACAO, LIMITE_DE_PONTOS_DA_ETAPA } from '$lib/constants';
	import selectedEtapa from '$src/stores/selectedEtapa.js';
	import { etapas } from '$src/stores/etapas';
	import { onDestroy, onMount } from 'svelte';
	import { navigationGuard } from '$src/stores/navigationGuard.js';
	import { Toaster, toast } from 'svelte-sonner';
	import { FORMACAO_GRUPO } from '$lib/constants';

	// export let data;
	let { data, children, form } = $props();

	let atividade = data.atividade;

	let etapasData = $state([]);
	let carregando = $state(true);
	// let tags = [];
	// let tagsAutocomplete = [];
	// let tagsColors = {};
	let oldValues = {}; // Objeto para guardar valores antigos para validação

	let realizacaoOpcoes = $state();
	let atribuicaoOpcoes = $state();
	let tipoAvaliacaoOpcoes = $state();
	let formacaoGrupoOpcoes = $state();
	let formacoesGrupo = $state();
	let showModalAtribuicaoNotas = $state(false);
	let proximoValor = $state();
	let isModalOpen = $state(false);
	const BACK_SKIP = [`/${data.perfil}/turmas`];
	let showModalCancelarAtividade = $state(false);
	let resolvePromise;

	let toastMessage = $state({ type: null, text: null });

	$effect.pre(() => {
		if (!form) return;

		if (form.erro) {
			toastMessage = { type: 'error', text: form.erro };
		} else if (form.success) {
			toastMessage = { type: 'success', text: 'Atividade adicionada com sucesso!' };
		}
	});

	$effect(() => {
		if (!toastMessage.text) return;

		if (toastMessage.type === 'error') {
			toast.error(toastMessage.text);
		} else if (toastMessage.type === 'success') {
			toast.success(toastMessage.text);
		}

		toastMessage = { type: null, text: null };
	});

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
		// Valida o total de pontos antes de submeter
		const totalPontos = etapasData[$selectedEtapa]?.criterios
			.map((criterio) => parseFloat(criterio.pontuacao_max) || 0)
			.reduce((acc, item) => acc + item, 0);

		if (totalPontos > LIMITE_DE_PONTOS_DA_ETAPA) {
			throw new Error(
				`A soma dos pontos dos critérios ultrapassa o limite de ${LIMITE_DE_PONTOS_DA_ETAPA}.`
			);
		}

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

		let criterios = etapasData[$selectedEtapa]?.criterios;
		if (criterios.length === 0) throw new Error('Etapa sem critérios definidos.');

		// Valida se algum critério está sem preenchimento
		for (const criterio of criterios) {
			if (!criterio.titulo || !criterio.pontuacao_max) {
				throw new Error('Existem critérios com título ou nota não preenchidos.');
			}
			if (etapasData[$selectedEtapa].atribuicaoNotasGroup == 'Média Ponderada' && !criterio.peso) {
				throw new Error('Existem critérios com peso não preenchido no modo de Média Ponderada.');
			}
		}

		let notaMax = etapasData[$selectedEtapa]?.criterios
			.map((criterio) => parseFloat(criterio.pontuacao_max))
			.reduce((item, acc) => item + acc);
		if (notaMax > LIMITE_DE_PONTOS_DA_ETAPA)
			throw new Error('Nota total passa o limite de ${LIMITE_DE_PONTOS_DA_ETAPA} pontos');

		for (const etapa of etapasData) {
			let dataInicial = etapa.dtEntregaMin;
			let dataFinal = etapa.dtEntregaMax;
			let tituloEtapa = etapa.titulo;
			let realizacao = etapa.realizacaoGroup;
			let formacoes = JSON.parse(JSON.stringify(etapa.formacoes));

			if (!isValidDate(dataInicial)) throw new Error(`Data de início inválida`);

			if (!isValidDate(dataFinal)) throw new Error(`Data máxima de entrega inválida`);

			for (const formacao of formacoes) {
				if (
					realizacao == 'Em Grupos' &&
					(formacao.nGrupos === null ||
						formacao.nAlunos === null ||
						formacao.nGrupos === '' ||
						formacao.nAlunos === '')
				) {
					throw new Error(`Formação de grupos com dados incompletos`);
				}
			}
		}

		return true;
	}

	function onAdicionaCriterio() {
		const novoCriterio = {
			titulo: '',
			descricao: '',
			pontuacao_max: '',
			peso: ''
		};

		etapasData[$selectedEtapa].criterios = [...etapasData[$selectedEtapa].criterios, novoCriterio];
	}

	function onRemoveCriterio(criterio) {
		etapasData[$selectedEtapa].criterios = etapasData[$selectedEtapa]?.criterios.filter((elem) => {
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

	function onNotaFocus(value, index) {
		oldValues[`nota_${index}`] = value;
	}

	function onChangeCriterioNota(index) {
		let criterio = etapasData[$selectedEtapa].criterios[index];
		criterio.pontuacao_max = formatarNota(criterio.pontuacao_max);

		if (parseFloat(criterio.pontuacao_max) > 10.0) {
			criterio.pontuacao_max = oldValues[`nota_${index}`];
		} else {
			oldValues[`nota_${index}`] = criterio.pontuacao_max;
		}
	}

	function onPesoFocus(value, index) {
		oldValues[`peso_${index}`] = value;
	}

	function onChangeCriterioPeso(index) {
		let criterio = etapasData[$selectedEtapa].criterios[index];
		let val = String(criterio.peso).replace(/\D/g, '').replace(/^0+/, '');

		if (parseFloat(val) > 10) {
			criterio.peso = oldValues[`peso_${index}`];
		} else {
			criterio.peso = val;
			oldValues[`peso_${index}`] = val;
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
		showModalAtribuicaoNotas = true;
	}

	function confirmaModalAtribuicaoDeNotas() {
		etapasData[$selectedEtapa].criterios = [
			// Mantém um critério em branco ao limpar
			{ titulo: '', descricao: '', pontuacao_max: '', peso: '' }
		];
		showModalAtribuicaoNotas = false;
		etapasData[$selectedEtapa].atribuicaoNotasGroup = proximoValor;
	}

	function handleRealizaoEtapa(valor) {
		etapasData[$selectedEtapa].realizacaoGroup = valor.trim();
	}

	function handleTipoAvaliacao(valor) {
		etapasData[$selectedEtapa].tipoAvaliacaoNotasGroup = valor.trim();
	}

	function handleCopiarCriterio() {
		showModalAtribuicaoNotas = true;
	}

	function handleCriteriosImportados(event) {
		const novosCriterios = event.detail;

		// Remove o critério inicial em branco se ele ainda estiver vazio
		if (
			etapasData[$selectedEtapa].criterios.length === 1 &&
			!etapasData[$selectedEtapa].criterios[0].titulo &&
			!etapasData[$selectedEtapa].criterios[0].pontuacao_max
		) {
			etapasData[$selectedEtapa].criterios = [];
		}

		const criteriosNaoDuplicados = novosCriterios.filter(
			(novo) => !etapasData[$selectedEtapa]?.criterios.some((atual) => atual.id === novo.id)
		);

		etapasData[$selectedEtapa].criterios = [
			...etapasData[$selectedEtapa].criterios,
			...criteriosNaoDuplicados
		];
	}

	function requestConfirmation() {
		showModalCancelarAtividade = true;
		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	}

	onDestroy(() => {
		navigationGuard.set(null);
	});

	function handleConfirm() {
		showModalCancelarAtividade = false;
		if (resolvePromise) {
			resolvePromise(true);
		}
	}

	function handleCancel() {
		showModalCancelarAtividade = false;
		if (resolvePromise) {
			resolvePromise(false);
		}
	}

	onMount(() => {
		if (data.parametroIdAtividade != undefined) {
			navigationGuard.set(requestConfirmation);
		}

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
						// *** ALTERAÇÃO AQUI: Inicia com um critério em branco ***
						criterios: [{ titulo: '', descricao: '', pontuacao_max: '', peso: '' }],
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

		return unsubscribe;
	});
</script>

<Modal
	visible={showModalCancelarAtividade}
	title="Atenção"
	message="Deseja realmente cancelar a criação da etapa? Todos os dados preenchidos serão perdidos."
	buttons={[
		{
			label: 'Sim, Cancelar',
			onClick: handleConfirm,
			color: 'green'
		},
		{
			label: 'Não, Continuar',
			onClick: handleCancel,
			color: 'red'
		}
	]}
/>
<Modal
	visible={showModalAtribuicaoNotas}
	title="Atenção"
	message="Deseja realmente alterar a atribuição de notas? Todos os critérios preenchidos serão perdidos."
	buttons={[
		{
			label: 'Sim, mudar atribuição',
			onClick: confirmaModalAtribuicaoDeNotas,
			color: 'green'
		},
		{
			label: 'Não, manter critérios',
			onClick: handleCancel,
			color: 'red'
		}
	]}
/>
<ModalImportarCriterios
	bind:isOpen={isModalOpen}
	criteriosDisponiveis={etapasData[$selectedEtapa]?.atribuicaoNotasGroup == 'Média Simples'
		? data.criteriosDoProfessor.filter((e) => e.peso == null)
		: data.criteriosDoProfessor.filter((e) => e.peso != null)}
	criteriosAtuais={etapasData[$selectedEtapa]?.criterios}
	on:import={handleCriteriosImportados}
	on:close={() => (isModalOpen = false)}
/>
<Toaster richColors expand position="top-center" closeButton />
{#if !carregando}
	<div class="caminho-de-pao-criacao">
		<p>Criar Atividade > <b><u>Definir Etapa / Critérios</u></b></p>
	</div>
	<div class="page-container">
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
									width="100%"
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
									max={atividade.prazo}
								/>
							</div>
							<div class="row">
								<h2>Data máxima de entrega:</h2>
								<InputDatetime
									id="inputDtFimEtapa"
									borded
									bind:value={etapasData[$selectedEtapa].dtEntregaMax}
									name="dtEntregaMax"
									min={etapasData[$selectedEtapa].dtEntregaMin}
									max={atividade.prazo}
								/>
							</div>
							<div class="row">
								<InputCheckbox
									fontSize="24px"
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
								<IconeInformacao text="Forma que a nota da etapa será calculada" />
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
								<IconeInformacao
									text={'"Individual": Entregas serão feitas individualmente por cada estudante.\n"Em Grupos": Estudantes se juntarão em grupos para realizar uma só entrega.'}
								/>
							</div>
							<hr />
							{#if etapasData[$selectedEtapa].realizacaoGroup == 'Em Grupos'}
								<div class="row">
									<IconeInformacao
										text={'"Individual": cada aluno será avaliado individualmente.\n "Em Grupos": Uma nota para o grupo todo'}
									/>
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
									<IconeInformacao text="Forma que os grupos de estudantes se formarão" />
									<h2>Formação dos grupos:</h2>
									<InputRadio
										id="formacaoGrupos"
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
									{#each etapasData[$selectedEtapa].formacoes as formacao, index (index)}
										<div class="row">
											<p>{index + 1}.</p>
											<InputNumber
												id="inputNGruposEtapa{index}"
												borded
												width="42px"
												padding="10px"
												fontWeight="500"
												bind:value={etapasData[$selectedEtapa].formacoes[index].nGrupos}
												name="nGrupos"
												min="1"
												max={data.nAlunosTurma - 1}
											/>
											<p>Grupos de</p>
											<InputNumber
												id="inputNAluno{index}"
												borded
												width="42px"
												padding="10px"
												fontWeight="500"
												bind:value={etapasData[$selectedEtapa].formacoes[index].nAlunos}
												name="nAluno"
												min="1"
												max={data.nAlunosTurma - 1}
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
											disabled={etapasData[$selectedEtapa].formacoes.length > 2}
											on:click={onAdicionaFormacao}>Nova Formação</Button
										>
									</div>
								</div>
							{/if}
						</div>
						<div class="criterios-container">
							<h1>Critérios</h1>
							<div class="column">
								<div class="row">
									<Button type="button" on:click={() => (isModalOpen = true)}>
										Copiar critérios de outra etapa</Button
									>
								</div>
								{#each etapasData[$selectedEtapa]?.criterios as criterio, index (index)}
									<div class="column">
										<div class="row">
											<InputText
												id="inputTituloCriterio-{index}"
												borded
												name="tituloCriterio"
												placeholder="Título"
												bind:value={criterio.titulo}
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
											/>
											{#if etapasData[$selectedEtapa].atribuicaoNotasGroup == 'Média Ponderada'}
												<InputNumber
													id="inputPesoCriterio-{index}"
													borded
													name="pesoCriterio"
													width="150px"
													placeholder="Peso"
													bind:value={criterio.peso}
													on:focus={() => onPesoFocus(criterio.peso, index)}
													on:input={() => onChangeCriterioPeso(index)}
												/>
											{/if}
											{#if index > 0}
												<Button
													color="var(--cor primaria)"
													type="button"
													on:click={() => onRemoveCriterio(criterio)}>X</Button
												>
											{/if}
										</div>
										<div class="row">
											<InputText
												id="inputDescricaoCriterio-{index}"
												borded
												name="descricaoCriterio"
												placeholder="Descrição"
												bind:value={criterio.descricao}
											/>
										</div>
									</div>
									<hr />
								{/each}
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
							<div class="criterios-definidos">
								<div class="pontuacao">
									<div class="total-de-pontos">
										<h2>Total de pontos:&emsp;</h2>
										<h2>
											{parseFloat(
												etapasData[$selectedEtapa]?.criterios
													.map((x) => parseFloat(x.pontuacao_max) || 0)
													.reduce((a, b) => a + b, 0)
											).toFixed(1)}
										</h2>
									</div>
									{#if etapasData[$selectedEtapa].atribuicaoNotasGroup === 'Média Ponderada'}
										<div class="total-de-pesos">
											<h2>Total de pesos:&emsp;</h2>
											<h2>
												{parseFloat(
													etapasData[$selectedEtapa]?.criterios
														.map((x) => parseFloat(x.peso) || 0)
														.reduce((a, b) => a + b, 0)
												).toFixed(1)}
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
</style>
