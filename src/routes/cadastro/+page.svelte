<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import InputPassword from '$lib/components/InputPassword.svelte';
	import Select from '$lib/components/Select.svelte';

	function aoCriarConta() {
		checkInputs();
	}

	let nomeCompleto,
		usuario,
		senha,
		repetirSenha,
		instituicao,
		dtNasc = '';

	let nomeCompletoEmpty,
		usuarioEmpty,
		senhaEmpty,
		repetirSenhaEmpty,
		instituicaoEmpty,
		dtNascEmpty = false;
	let selectOptionList = ['24', '420', '69', 'EST - UEA'];

	// TODO: função de cadastro
	// TODO: Feddback de campo vazio
	function checkInputs() {
		let ok = true;

		if (!usuario) {
			usuarioEmpty = true;
			ok = false;
		}
		if (!nomeCompleto) {
			nomeCompletoEmpty = true;
			ok = false;
		}
		if (!senha) {
			senhaEmpty = true;
			ok = false;
		}
		if (!repetirSenha) {
			repetirSenhaEmpty = true;
			ok = false;
		}
		if (!instituicao) {
			instituicaoEmpty = true;
			ok = false;
		}
		if (!dtNasc) {
			dtNascEmpty = true;
			ok = false;
		}

		return ok;
	}

	function usuarioInputHandler(e) {
		if (e.target.value.length > 0) usuarioEmpty = false;
	}

	function nomeCompletoInputHandler(e) {
		if (e.target.value.length > 0) nomeCompletoEmpty = false;
	}

	function senhaInputHandler(e) {
		if (e.target.value.length > 0) senhaEmpty = false;
	}
	function repetirSenhaInputHandler(e) {
		if (e.target.value.length > 0) repetirSenhaEmpty = false;
	}
	function instituicaoInputHandler(e) {
		if (e.target.value.length > 0) instituicaoEmpty = false;
	}
	function dtNascInputHandler(e) {
		if (e.target.value.length > 0) dtNascEmpty = false;
	}

	// TODO: Validação dos campos
	// TODO: Lista de instituições no BD
	// TODO: Redirecionar para a tela de login
</script>

<div class="login-container">
	<h1>Cadastre-se no <b>Gameclass</b></h1>
	<span>e descubra uma nova experiência de aprendizado</span>
	<div class="card-container">
		<!-- Nome Completo -->
		<div style="display:flex; flex-direction: column;">
			<InputText
				placeholder="Nome Completo"
				bind:value={nomeCompleto}
				inputHandler={nomeCompletoInputHandler}
			/>
			{#if nomeCompletoEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputText placeholder="Usuário" bind:value={usuario} inputHandler={usuarioInputHandler} />
			{#if usuarioEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputPassword placeholder="Senha" bind:value={senha} inputHandler={senhaInputHandler} />
			{#if senhaEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputPassword
				placeholder="Repetir senha"
				bind:value={repetirSenha}
				inputHandler={repetirSenhaInputHandler}
			/>
			{#if repetirSenhaEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<Select
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

		<div style="display:flex; flex-direction: column;">
			<InputDate inputHandler={dtNascInputHandler} bind:value={dtNasc} />
			{#if dtNascEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>
		<!-- <InputText type="text" placeholder="Instituição" bind:value={instituicao}/> -->
		<!-- <InputText type="text" placeholder="Data de Nascimento" bind:value={dtNasc}/> -->
		<br />

		<Button onClick={aoCriarConta}>Criar Conta</Button>
	</div>
</div>

<style>
	.login-container {
		height: 100%;
		font: var(--font);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		margin-top: 6rem;
		font-size: 48px;
		/* font-weight: lighter; */
	}

	.login-container > span {
		margin-top: 18px;
		font-size: 30px;
	}

	.error {
		color: red;
		font-weight: 700;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		background-color: var(--cor-primaria);
		width: 439px;
		padding-right: 42px;
		padding-left: 42px;
		padding-top: 84px;
		padding-bottom: 42px;
		margin-top: 75px;
		border-radius: 15px;
		gap: 24px;
	}
</style>
