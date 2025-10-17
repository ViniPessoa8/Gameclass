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

	let { data, children } = $props();
	const BACK_SKIP = [`/${data.perfil}/turmas`];

	let showModalCancelarAtividade = $state(false);
	let resolvePromise;

	// 1. A função que será colocada na store.
	// Ela mostra o modal e retorna uma Promise que espera a decisão do usuário.
	function requestConfirmation() {
		showModalCancelarAtividade = true;
		return new Promise((resolve) => {
			// Guardamos a função resolve para que os botões do modal possam chamá-la.
			resolvePromise = resolve;
		});
	}

	// 3. Limpa a guarda quando o componente é destruído.
	// Isso é CRUCIAL para que outras páginas não acionem a confirmação.
	onDestroy(() => {
		navigationGuard.set(null);
	});

	// Funções chamadas pelos botões do modal
	function handleConfirm() {
		showModalCancelarAtividade = false;
		if (resolvePromise) {
			resolvePromise(true); // Confirma a navegação
		}
	}

	function handleCancel() {
		showModalCancelarAtividade = false;
		if (resolvePromise) {
			resolvePromise(false); // Cancela a navegação
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
		const offsetMinutes = -4 * 60; // GMT-4
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
			throw Error('Criação de atividade: Prazo inválido.');
		}

		return true;
	}

	function validaInputs() {
		let ok = true;

		if (!titulo) {
			tituloEmpty = true;
			ok = false;
		}

		if (!descricao) {
			descricaoEmpty = true;
			ok = false;
		}

		if (!prazo) {
			prazoEmpty = true;
			ok = false;
		}

		// TODO: Verificar se não existe outra atividade com o mesmo título na mesma turma

		return ok;
	}

	function onSubmit() {
		// TODO: salvar tags no banco do usuário, para sugerir na proxima criação de atividade

		if (!validaInputs()) return false;
		if (!validaPrazo()) return false;
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
		// form.already_registered = false;
	}

	function descricaoInputHandler(e) {
		if (e.target.value.length > 0) tituloEmpty = false;
		// form.already_registered = false;
	}

	function prazoInputHandler(e) {
		if (e.target.value.length != undefined) prazoEmpty = false;
		// form.already_registered = false;
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
	<h1>{data.nomeTurma}</h1>
	<h2>Criação de Atividade</h2>
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
</style>
