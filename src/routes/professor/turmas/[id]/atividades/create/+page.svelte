<script>
	import { enhance } from '$app/forms';
	import InputText from '$lib/components/InputText.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import InputRadio from '$lib/components/InputRadio.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import InputCheckbox from '$lib/components/InputCheckbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import Tags from 'svelte-tags-input';
	import InputDatetime from '$lib/components/InputDatetime.svelte';
	import { toast, Toaster } from 'svelte-sonner';

	export let data;

	let titulo = null,
		descricao = null,
		prazo = null,
		realizacao = null,
		atribuicaoDeNotas = ['media_simples'],
		receberAposPrazo = false,
		tags = [];
	let tagsAutocomplete = [];
	let tagsColors = {};
	let tituloEmpty, descricaoEmpty, prazoEmpty;

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
		console.debug('/atividades/create onSubmit()');
		console.debug('titulo: ', titulo);
		console.debug('descricao: ', descricao);
		console.debug('prazo: ', prazo);
		console.debug('tags: ', tags);
		console.debug('tagsColors: ', tagsColors);
		console.debug('atribuicaoDeNotas: ', atribuicaoDeNotas);
		console.debug('realizacao: ', realizacao);
		console.debug('receberAposPrazo: ', receberAposPrazo);

		// TODO: salvar tags no banco do usuário, para sugerir na proxima criação de atividade

		if (!validaInputs()) return false;
		if (!validaPrazo()) return false;
		return true;
	}

	function onTagAdicionada(tag, index) {
		console.log('onTagAdicionada() param.tag: ', tag);
		console.log('onTagAdicionada() param.index: ', index);
		tagsColors[tag] = 'black';
		console.log('onTagAdicionada() tags: ', tags);
		console.log('onTagAdicionada() tagsColors: ', tagsColors);
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
</script>

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
	<!-- Tags -->
	<div class="row">
		<h3>Tags:</h3>
		<!-- TODO: Make Tag style editable (https://svelte-tags-input.vercel.app/#:~:text=How%20to%20override%20default%20styles%3F) -->
		<!-- TODO: Generate random colors -->
		<Tags
			bind:tags
			maxTags={5}
			onlyUnique={true}
			onTagAdded={onTagAdicionada}
			onTagRemoved={onTagRemovida}
		/>
	</div>
	<!-- Atribuição de Notas -->
	<div class="row">
		<h3>Atribuição de notas:</h3>
		<div class="column">
			<InputRadio
				bind:group={atribuicaoDeNotas}
				options={[
					{
						name: 'media_simples',
						text: 'Média Simples'
					},
					{
						name: 'media_ponderada',
						text: 'Média Ponderada'
					}
				]}
			/>
		</div>
		<IconeInformacao text="Método de cálculo das notas dos alunos." />
	</div>
	<!-- Realização -->
	<div class="row">
		<h3>Realização:</h3>
		<div class="column">
			<InputRadio
				bind:group={realizacao}
				options={[
					{
						name: 'individual',
						text: 'Individual'
					},
					{
						name: 'grupos',
						text: 'Em Grupos'
					}
				]}
			/>
		</div>
		<IconeInformacao text="Forma em que os alunos irão realizar atividade." />
	</div>
	<!-- Receber após o prazo -->
	<div class="row">
		<InputCheckbox bind:checked={receberAposPrazo} text="Receber após o prazo" />
		<IconeInformacao text="Receber a tarefa mesmo que o prazo final tenha passado." />
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
</style>
