<script>
	import { enhance } from '$app/forms';
	import InputText from '$lib/components/InputText.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tags from 'svelte-tags-input';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import { toast, Toaster } from 'svelte-sonner';
	import Modal from '$lib/components/Modal.svelte';
	import { navigationGuard } from '$src/stores/navigationGuard.js';
	import { onDestroy, onMount } from 'svelte';
	import { debug } from '$lib/utils/logger';

	let { data, children } = $props();
	const BACK_SKIP = [`/${data.perfil}/turmas`];

	let showModalCancelarAtividade = $state(false);
	let resolvePromise;
	let tituloJaExiste = $state(false);
	let verificandoTitulo = $state(false);

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

	let titulo = $state(null),
		descricao = $state(null),
		prazo = $state(null),
		realizacao = null,
		atribuicaoDeNotas = ['media_simples'],
		receberAposPrazo = false,
		tags = [];
	let tagsAutocomplete = [];
	let tagsColors = $state({});
	let tituloEmpty = $state(),
		descricaoEmpty = $state(),
		prazoEmpty = $state();

	function showISOAsGMT4(isoUTC) {
		const offsetMinutes = -4 * 60;
		const utcDate = new Date(isoUTC);
		const localDate = new Date(utcDate.getTime() + offsetMinutes * 60000);
		const datetimeLocal = localDate.toISOString().slice(0, 16);

		return datetimeLocal;
	}

	let dateNow = new Date();
	let dateNowFormated = showISOAsGMT4(dateNow);

	function validaPrazo() {
		let prazoDate = new Date(prazo).getTime();
		let hoje = new Date().getTime();

		if (prazoDate <= hoje) {
			toast.error('O prazo não pode ser uma data ou hora passada.');
			return false;
		}

		return true;
	}

	function validaInputs() {
		let ok = true;

		if (!titulo) {
			tituloEmpty = true;
			ok = false;
		}

		if (tituloJaExiste) {
			ok = false;
		}


		if (!prazo) {
			prazoEmpty = true;
			ok = false;
		}

		return ok;
	}

	function onSubmit() {
		if (!validaPrazo()) return false;
		if (!validaInputs()) return false;
		return true;
	}

	function onTagAdicionada(tag, index) {
		tagsColors[tag] = 'black';
	}

	function onTagRemovida() {
		// remove a cor correspondente no dicionario de cores
		let tagsColorsKeys = Object.keys(tagsColors);
		tagsColorsKeys.forEach((tagKey) => {
			if (!tags.includes(tagKey)) {
				delete tagsColors[tagKey];
			}
		});
	}

	// INPUT HANDLERS
	function tituloInputHandler(e) {
		if (e.target.value.length > 0) tituloEmpty = false;
		tituloJaExiste = false;
	}

	function descricaoInputHandler(e) {
		if (e.target.value.length > 0) descricaoEmpty = false;
	}

	function prazoInputHandler(e) {
		if (e.target.value.length != undefined) prazoEmpty = false;
		// form.already_registered = false;
	}

	async function validarTituloNoServidor() {
		// Não faz nada se o título estiver vazio
		if (!titulo || titulo.trim() === '') {
			return;
		}

		verificandoTitulo = true;
		try {
			// ATENÇÃO: Ajuste `data.idTurma` para a propriedade correta que contém o ID da turma.
			const idTurma = data.idTurma;
			const tituloAtividade = titulo.trim();
			const response = await fetch(
				`/api/atividade/valida-titulo?titulo=${encodeURIComponent(tituloAtividade)}&id_turma=${idTurma}`
			);

			if (response.ok) {
				const result = await response.json();
				tituloJaExiste = result.exists;
				if (tituloJaExiste) {
					toast.error('Este título já está sendo usado em outra atividade da turma.');
				}
			} else {
				toast.error('Não foi possível verificar o título. Tente novamente.');
			}
		} catch (error) {
			toast.error('Erro de conexão ao validar o título.');
			console.error('Erro ao chamar API de validação:', error);
		} finally {
			verificandoTitulo = false;
		}
	}

	onMount(() => {
		navigationGuard.set(requestConfirmation);
		if (data.atividade) {
			titulo = data.atividade.titulo;
			descricao = data.atividade.descricao;
			prazo = showISOAsGMT4(data.atividade.prazo);
		}
	});
</script>

<Modal
	visible={showModalCancelarAtividade}
	title="Atenção"
	message="Deseja realmente cancelar a criação de atividade? Todos os dados preenchidos serão perdidos."
	buttons={[
		{
			label: 'Sim, Cancelar',
			onClick: handleConfirm, // Chama a função que resolve a Promise com 'true'
			color: 'green'
		},
		{
			label: 'Não, Continuar',
			onClick: handleCancel, // Chama a função que resolve a Promise com 'false'
			color: 'red'
		}
	]}
/>

<Toaster richColors expand position="top-center" closeButton />
<form
	class="cria-atividade-form"
	method="post"
	use:enhance={({ formData, cancel }) => {
		if (!onSubmit()) {
			cancel();
		}

		formData.delete('media_simples');
		formData.delete('media_ponderada');
		formData.delete('individual');
		formData.delete('grupos');
		formData.delete('svelte-tags-input');
		formData.set('tags', JSON.stringify(tagsColors));
		formData.set('atribuicaoDeNotas', atribuicaoDeNotas);
		formData.set('realizacao', realizacao);
		formData.set('receberAposPrazo', receberAposPrazo);

		return async ({ result, update }) => {
			if (result.type == 'failure') {
				if (result.data.duplicated) {
					toast.error(result.data.e);
				}
			}
			await update();
		};
	}}
>
	<div class="caminho-de-pao-criacao">
		<p><b><u>Criar Atividade</u></b> > Definir Etapa / Critérios</p>
	</div>
	<h1>Criar atividade em {data.nomeTurma}</h1>
	<h3 class="descricao-atividade">
		Atividade é um grupo de etapas, tendo no mínimo 1 etapa e no máximo 5.<br /> A etapa será definida
		na próxima tela.
	</h3>
	<!-- Titulo da Atividade -->
	<div class="column">
		<div class="row">
			<h3>Titulo da atividade:</h3>
			<InputText
				name="titulo"
				id="inputTitulo"
				borded="true"
				bind:value={titulo}
				inputHandler={tituloInputHandler}
				on:blur={validarTituloNoServidor}
				placeholder="Ex: Atividade parcial 1"
			/>
		</div>
		{#if tituloEmpty}
			<span class="error" style="visibility: visible;">*Campo obrigatório</span>
		{:else}
			<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
		{/if}
	</div>
	<!-- Descrição -->
	<div class="column">
		<div class="row">
			<h3>Descrição:</h3>
			<InputTextArea
				name="descricao"
				id="inputDescricao"
				borded="true"
				bind:value={descricao}
				inputHandler={descricaoInputHandler}
				backgroundColor="var(--cor-primaria)"
				width="600px"
				height="200px"
				placeholder="Descrição da atividade..."
			/>
		</div>
		{#if descricaoEmpty}
			<span class="error" style="visibility: visible;">*Campo obrigatório</span>
		{:else}
			<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
		{/if}
	</div>
	<!-- Prazo -->
	<div class="column">
		<div class="row">
			<h3>Prazo:</h3>
			<InputDatetime
				name="prazo"
				id="inputPrazo"
				borded="true"
				bind:value={prazo}
				inputHandler={prazoInputHandler}
				min={dateNowFormated}
			/>
		</div>
		{#if prazoEmpty}
			<span class="error" style="visibility: visible;">*Campo obrigatório</span>
		{:else}
			<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
		{/if}
	</div>
	<div class="row">
		<Button type="submit" backgroundColor="var(--cor-primaria)" color="white">Próximo</Button>
	</div>
</form>

<style>
	.cria-atividade-form {
		margin-top: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
	}

	.row {
		font-size: 24px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.error {
		align-self: end;
		color: red;
		font-weight: 700;
		margin-right: 12px;
	}

	.caminho-de-pao-criacao {
		width: 90%;
		margin-left: 110px;
		margin-top: 14px;
		color: gray;
		font-size: 24px;
		display: flex;
		flex-direction: row;
	}

	.caminho-de-pao-criacao b {
		color: var(--cor-primaria);
	}

	.descricao-atividade {
		margin-bottom: 24px;
	}
</style>
