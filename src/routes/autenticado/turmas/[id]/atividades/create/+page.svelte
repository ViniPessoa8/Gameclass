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

	export let data;

	let titulo,
		descricao,
		prazo,
		realizacao = null;
	let atribuicaoDeNotas = ['media_simples'];

	let tituloEmpty, descricaoEmpty, prazoEmpty;

	let receberAposPrazo = false;
	let autocomplete = []; // TODO: Get previous tags from user
	let tags = [];

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
		console.debug('atribuicaoDeNotas: ', atribuicaoDeNotas);
		console.debug('realizacao: ', realizacao);
		console.debug('receberAposPrazo: ', receberAposPrazo);

		// TODO: salvar tags no banco do usuário, para sugerir na proxima criação de atividade

		validaInputs();
		validaPrazo();
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

<form
	class="cria-atividade-form"
	method="post"
	use:enhance={({ cancel }) => {
		if (!onSubmit() /* || form?.already_registered */) {
			cancel();
		}

		return async ({ update }) => {
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
			<InputText borded="true" bind:value={titulo} inputHandler={tituloInputHandler} />
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
			<InputTextArea borded="true" bind:value={descricao} inputHandler={descricaoInputHandler} />
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
			<InputDatetime borded="true" bind:value={prazo} inputHandler={prazoInputHandler} />
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
		<Tags bind:tags name="tag" maxTags={5} onlyUnique={false} onTagClick={(tag) => alert(tag)} />
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
		<InputCheckbox
			bind:checked={receberAposPrazo}
			text="Receber após o prazo"
			name="receber_apos_prazo"
		/>
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
