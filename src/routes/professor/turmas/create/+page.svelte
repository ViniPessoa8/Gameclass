<script>
	import InputText from '$lib/components/InputText.svelte';
	import Button from '$lib/components/Button.svelte';
	import Select from '$lib/components/Select.svelte';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let codigo,
		disciplina,
		nome,
		descricao,
		ano,
		periodo,
		local,
		instituicao = '';

	let codigoEmpty,
		disciplinaEmpty,
		nomeEmpty,
		descricaoEmpty,
		anoEmpty,
		periodoEmpty,
		localEmpty,
		instituicaoEmpty = false;

	let selectOptionDict = data['instituicoes'];
	let selectOptionList = selectOptionDict.map((instituicao) => instituicao.nome);
	let anoOptionList = [2024, 2023, 2022]; // TODO: Automatizar lista
	let periodoOptionList = [1, 2];

	function checkInputs() {
		let ok = true;

		if (!codigo) {
			codigoEmpty = true;
			ok = false;
		}
		if (!disciplina) {
			disciplinaEmpty = true;
			ok = false;
		}
		if (!nome) {
			nomeEmpty = true;
			ok = false;
		}
		if (!descricao) {
			descricaoEmpty = true;
			ok = false;
		}
		if (!ano) {
			anoEmpty = true;
			ok = false;
		}
		if (!periodo) {
			periodoEmpty = true;
			ok = false;
		}
		if (!local) {
			localEmpty = true;
			ok = false;
		}
		if (!instituicao) {
			instituicaoEmpty = true;
			ok = false;
		}

		return ok;
	}

	function codigoInputHandler(e) {
		if (e.target.value.length > 0) codigoEmpty = false;
		form.already_registered = false;
	}

	function disciplinaInputHandler(e) {
		if (e.target.value.length > 0) disciplinaEmpty = false;
	}

	function nomeInputHandler(e) {
		if (e.target.value.length > 0) nomeEmpty = false;
	}

	function descricaoInputHandler(e) {
		if (e.target.value.length > 0) descricaoEmpty = false;
	}

	function anoInputHandler(e) {
		if (e.target.value.length > 0) anoEmpty = false;
	}

	function periodoInputHandler(e) {
		if (e.target.value.length > 0) periodoEmpty = false;
	}

	function localInputHandler(e) {
		if (e.target.value.length > 0) localEmpty = false;
	}

	function instituicaoInputHandler(e) {
		if (e.target.value.length > 0) instituicaoEmpty = false;
		form.already_registered = false;
	}

	function aoCriarTurma() {
		if (!checkInputs()) return false;

		let instituicao_id = -1;

		for (let key in selectOptionDict) {
			let inst = selectOptionDict[key];
			if (inst['nome'] === instituicao) {
				instituicao_id = inst['id'];
			}
		}

		return true;
	}
</script>

<div class="form-container">
	<h1>Criação de nova turma</h1>
	<form
		method="POST"
		use:enhance={({ cancel }) => {
			if (!aoCriarTurma() || form?.already_registered) {
				cancel();
			}

			return async ({ update }) => {
				await update();
			};
		}}
	>
		<div class="row">
			<h2>Código da turma:</h2>
			<div style="display:flex; flex-direction: column;">
				<InputText borded name="codigo" bind:value={codigo} inputHandler={codigoInputHandler} />
				{#if codigoEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<h2>Disciplina:</h2>
			<div style="display:flex; flex-direction: column;">
				<InputText
					borded
					name="disciplina"
					bind:value={disciplina}
					inputHandler={disciplinaInputHandler}
				/>
				{#if disciplinaEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<h2>Nome da turma:</h2>
			<div style="display:flex; flex-direction: column;">
				<InputText borded name="nome" bind:value={nome} inputHandler={nomeInputHandler} />
				{#if nomeEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<h2>Descrição:</h2>
			<div style="display:flex; flex-direction: column;">
				<InputText
					borded
					name="descricao"
					bind:value={descricao}
					inputHandler={descricaoInputHandler}
				/>
				{#if descricaoEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<h2>Local:</h2>
			<div style="display:flex; flex-direction: column;">
				<InputText borded name="local" bind:value={local} inputHandler={localInputHandler} />
				{#if localEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<h2>Ano letivo:</h2>
			<div style="display:flex; flex-direction: column;">
				<!-- <InputText borded name="ano" bind:value={ano} inputHandler={anoInputHandler} /> -->
				<Select
					borded
					name="ano"
					width="100"
					optionList={anoOptionList}
					inputHandler={anoInputHandler}
					bind:value={ano}
				/>
				{#if anoEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
			<h2>Período:</h2>
			<div style="display:flex; flex-direction: column;">
				<!-- <InputText borded name="periodo" bind:value={periodo} inputHandler={periodoInputHandler} /> -->
				<Select
					borded
					name="periodo"
					width="60"
					optionList={periodoOptionList}
					inputHandler={periodoInputHandler}
					bind:value={periodo}
				/>
				{#if periodoEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<h2>Instituição:</h2>
			<div style="display:flex; flex-direction: column;">
				<Select
					borded
					name="instituicao"
					unselectedText="--Selecione sua Instituição--"
					optionList={selectOptionList}
					inputHandler={instituicaoInputHandler}
					bind:value={instituicao}
				/>
				{#if instituicaoEmpty}
					<span class="error" style="visibility: visible;">*Campo obrigatório</span>
				{:else}
					<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
				{/if}
			</div>
		</div>
		{#if form?.already_registered}
			<span class="error" style="visibility: visible;"
				>Uma turma já existe com o mesm o código nessa instituição</span
			>
		{:else}
			<span class="error" style="visibility: hidden;"
				>Uma turma já existe com o mesm o código nessa instituição</span
			>
		{/if}

		<!-- TODO: Fazer botão aparecer -->
		<div class="row" style="align-self: center;">
			<Button backgroundColor="var(--cor-secundaria)" color="var(--cor-primaria)"
				>Criar Turma</Button
			>
		</div>
	</form>
</div>

<style>
	.form-container {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: end;
		margin-bottom: 60px;
	}

	h1 {
		margin-bottom: 30px;
	}

	h2 {
		padding-bottom: 20px;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 20px;
	}

	.error {
		color: red;
		font-weight: 700;
	}
</style>
