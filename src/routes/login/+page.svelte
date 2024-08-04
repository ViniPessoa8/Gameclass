<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import ButtonForm from '$lib/components/ButtonForm.svelte';
	import InputPassword from '$lib/components/InputPassword.svelte';
	import { goto } from '$app/navigation';
	import ButtonRedirect from '../../lib/components/ButtonRedirect.svelte';

	let userLogin = '';
	let userPassword = '';
	let loginErrorVisibility = false;
	let passwordErrorVisibility = false;
	let loginRes = '';

	function loginInputHandler(e) {
		if (e.target.value.length > 0) loginErrorVisibility = false;
		loginRes = '';
	}

	function passwordInputHandler(e) {
		if (e.target.value.length > 0) passwordErrorVisibility = false;
		loginRes = '';
	}

	function checkInputs() {
		let ok = true;
		if (!userLogin) {
			console.log('!userLogin');
			loginErrorVisibility = true;
			ok = false;
		}

		if (!userPassword) {
			console.log('!userPassword');
			passwordErrorVisibility = true;
			ok = false;
		}

		return ok;
	}

	async function aoLogar() {
		// TODO: Usar HTTPS para encriptar dados na requisição
		if (!checkInputs()) {
			loginRes = '';
			return false;
		}

		let res = await fetch(`http://localhost:5173/api/database/login`, {
			method: 'POST',
			body: JSON.stringify({
				login: userLogin,
				password: userPassword
			})
		});

		// TODO: Redirecionar para a tela de escolha do perfil
		let resText = await res.json();
		loginRes = resText;
		return resText;
	}
</script>

<div class="login-container">
	<h1>Bem vindo(a) ao <b>Gameclass</b></h1>
	<span>Sua plataforma online de aprendizado gamificado</span>
	<form class="card-container">
		<div style="display:flex; flex-direction: column;">
			<InputText
				id="loginInput"
				bind:value={userLogin}
				inputHandler={loginInputHandler}
				placeholder="Nome de usuário / E-mail"
			/>
			{#if loginErrorVisibility}
				<span class="error-login">*Campo obrigatório*</span>
			{:else}
				<span class="error-login" style="visibility: hidden">*Campo obrigatório*</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputPassword
				bind:value={userPassword}
				type="password"
				inputHandler={passwordInputHandler}
				placeholder="Senha"
			/>
			<div></div>
			{#if passwordErrorVisibility}
				<span class="error-password">*Campo obrigatório*</span>
			{:else}
				<span class="error-password" style="visibility: hidden">*Campo obrigatório*</span>
			{/if}
		</div>
		<br />

		{#if loginRes === 'Login incorreto'}
			<span class="incorrect-login">{loginRes}</span>
		{:else if loginRes === 'Logado com sucesso'}
			<span class="successful-login">{loginRes}</span>
		{:else}
			<span class="successful-login" style="visibility: hidden;">fill</span>
		{/if}
		<ButtonForm onClick={aoLogar} text="Login" />
		<ButtonRedirect href="/cadastro">Criar Conta</ButtonRedirect>
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

	.error-login {
		color: red;
	}

	.error-password {
		color: red;
	}

	.incorrect-login {
		color: red;
		font-weight: 600;
		font-size: 24px;
	}

	.successful-login {
		color: green;
		font-weight: 600;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		background-color: var(--cor-primaria);
		width: 439px;
		padding-right: 42px;
		padding-left: 42px;
		padding-top: 84px;
		padding-bottom: 84px;
		margin-top: 75px;
		border-radius: 15px;
		gap: 24px;
	}
</style>
