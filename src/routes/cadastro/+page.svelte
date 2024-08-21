<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import InputPassword from '$lib/components/InputPassword.svelte';
	import Select from '$lib/components/Select.svelte';
	import { PASSWORD_MAX_CHARACTERS, PASSWORD_MIN_CHARACTERS } from '$lib/constants.js';
	import { enhance } from '$app/forms';

	export let data;

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

	let senhasIncompativeis = false;
	let erroSenhaTamanhoMinimo, erroSenhaTamanhoMaximo, erroSenhaCaracteres;

	let selectOptionDict = data['instituicoes'];
	let selectOptionList = selectOptionDict.map((instituicao) => instituicao.nome);

	function aoCriarConta() {
		if (!checkInputs()) return false;
		if (!verificarRequisitosSenha()) return false;
		if (!checkPasswords()) return false;

		let instituicao_id = -1;

		for (let key in selectOptionDict) {
			let inst = selectOptionDict[key];
			if (inst['nome'] === instituicao) {
				instituicao_id = inst['id'];
			}
		}

		return true;
	}

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

	function verificarRequisitosSenha() {
		// - tamanho mínimo: 8 caracteres
		if (!senha || senha.length < PASSWORD_MIN_CHARACTERS) {
			erroSenhaTamanhoMinimo = true;
			return false;
		}

		// - tamanho máximo: 16 caracteres
		if (senha.length > PASSWORD_MAX_CHARACTERS) {
			erroSenhaTamanhoMaximo = true;
			return false;
		}

		// - ao menos um caractere especial
		// - ao menos um maíusculo e um minúsculo
		// - Ter ao menos um número
		const regex = new RegExp(
			String.raw`^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$`
		);
		if (!regex.exec(senha)) {
			erroSenhaCaracteres = true;
			return false;
		}

		return true;
	}

	function checkPasswords() {
		if (senha === repetirSenha) {
			return true;
		}
		senhasIncompativeis = true;
		return false;
	}

	function usuarioInputHandler(e) {
		if (e.target.value.length > 0) usuarioEmpty = false;
	}

	function nomeCompletoInputHandler(e) {
		if (e.target.value.length > 0) nomeCompletoEmpty = false;
	}

	function senhaInputHandler(e) {
		if (e.target.value.length > 0) {
			senhaEmpty = false;
			senhasIncompativeis = false;
			erroSenhaCaracteres = false;
		}

		if (e.target.value.length >= PASSWORD_MIN_CHARACTERS) {
			erroSenhaTamanhoMinimo = false;
		}

		if (e.target.value.length <= PASSWORD_MAX_CHARACTERS) {
			erroSenhaTamanhoMaximo = false;
		}

		if (e.target.value.length > PASSWORD_MAX_CHARACTERS) {
			erroSenhaTamanhoMaximo = true;
		}
	}

	function repetirSenhaInputHandler(e) {
		if (e.target.value.length > 0) {
			repetirSenhaEmpty = false;
			senhasIncompativeis = false;
		}
	}

	function instituicaoInputHandler(e) {
		if (e.target.value.length > 0) instituicaoEmpty = false;
	}

	function dtNascInputHandler(e) {
		if (e.target.value.length > 0) dtNascEmpty = false;
	}
</script>

<div class="login-container">
	<h1>Cadastre-se no <b>Gameclass</b></h1>
	<span>e descubra uma nova experiência de aprendizado</span>
	<form
		class="card-container"
		method="post"
		use:enhance={({ cancel }) => {
			console.log('ENTROU');
			if (!aoCriarConta()) {
				console.log('ENTROU MUITO');
				cancel();
			}

			return async ({ result, update }) => {
				console.log('RESULT: ', result);
				await update();
			};
		}}
	>
		<!-- Nome Completo -->
		<div style="display:flex; flex-direction: column;">
			<InputText
				name="nome"
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
			<InputText
				name="usuario"
				placeholder="Usuário"
				bind:value={usuario}
				inputHandler={usuarioInputHandler}
			/>
			{#if usuarioEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputPassword
				name="password"
				placeholder="Senha"
				bind:value={senha}
				inputHandler={senhaInputHandler}
			/>
			{#if senhaEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else if erroSenhaTamanhoMinimo}
				<span class="error" style="visibility: visible;"
					>Mínimo: {PASSWORD_MIN_CHARACTERS} caracteres</span
				>
			{:else if erroSenhaTamanhoMaximo}
				<span class="error" style="visibility: visible;"
					>Máximo: {PASSWORD_MAX_CHARACTERS} caracteres</span
				>
			{:else if erroSenhaCaracteres}
				<span class="error" style="visibility: visible;">
					Deve conter número, maíusculas, minúsculas e caracteres especiais
				</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputPassword
				placeholder="Repetir senha"
				bind:value={repetirSenha}
				inputHandler={repetirSenhaInputHandler}
				onFocusOut={checkPasswords}
			/>
			{#if repetirSenhaEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else if senhasIncompativeis}
				<span class="error" style="visibility: visible;">Senhas Incompatíveis</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<Select
				name="instituicao"
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
			<InputDate name="dtNasc" inputHandler={dtNascInputHandler} bind:value={dtNasc} />
			{#if dtNascEmpty}
				<span class="error" style="visibility: visible;">*Campo obrigatório</span>
			{:else}
				<span class="error" style="visibility: hidden;">*Campo obrigatório</span>
			{/if}
		</div>
		<br />

		<Button type="submit">Criar Conta</Button>
	</form>
</div>

<style>
	.login-container {
		height: 100%;
		font: var(--font);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 48px;
	}

	h1 {
		margin-top: 4rem;
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
