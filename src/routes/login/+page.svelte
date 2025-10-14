<script>
	import '../../static/app.css';
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import InputPassword from '$lib/components/InputPassword.svelte';
	import ButtonRedirect from '$lib/components/ButtonRedirect.svelte';
	import { enhance } from '$app/forms';
	import { Toaster, toast } from 'svelte-sonner';
	import { onMount } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').ActionData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	onMount(async () => {
		if (data.toast === 'cadastro') {
			toast.success('Cadastro realizado com sucesso');
		}

		if (data.toast === 'sessao_expirada') {
			toast.success('Sessão expirada, realize o login novamente.');
		}
	});

	let loginRes = '';
	let userLogin = $state(),
		userPassword = $state();
	let loginErrorVisibility = $state(false);
	let passwordErrorVisibility = $state(false);

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
			loginErrorVisibility = true;
			ok = false;
		}

		if (!userPassword) {
			passwordErrorVisibility = true;
			ok = false;
		}

		return ok;
	}
</script>

<Toaster richColors position="top-center" closeButton />
<div class="login-container">
	<h1>Bem vindo(a) ao <b>Gameclass</b></h1>
	<span>Sua plataforma online de aprendizado gamificado</span>
	<form
		class="card-container"
		method="post"
		use:enhance={({ cancel }) => {
			if (!checkInputs()) {
				toast.warning('Preencha todos os campos obrigatórios.');
				cancel();
			}

			return async ({ result, update }) => {
				if (result.type === 'failure') {
					toast.error('Login incorreto');
					console.error(result);
				}

				await update();
			};
		}}
	>
		<div style="display:flex; flex-direction: column;">
			<InputText
				id="loginInput"
				name="login"
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
				id="passwordInput"
				type="password"
				name="password"
				bind:value={userPassword}
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

		<Button id="btnLogin" width="fit-content" type="submit" onclick={checkInputs}>Login</Button>
		<ButtonRedirect id="btnCadastro" href="/cadastro">Criar Conta</ButtonRedirect>
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
		font-weight: 600;
	}

	.error-password {
		font-weight: 600;
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
