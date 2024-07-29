<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import ButtonForm from '$lib/components/ButtonForm.svelte';
	import InputPassword from '$lib/components/InputPassword.svelte';

	let userLogin = '';
	let userPassword = '';
	let loginErrorVisibility = false;
	let passwordErrorVisibility = 'collapse';

	async function aoLogar() {
		// TODO: Usar HTTPS para encriptar dados na requisição
		// TODO: Testar se o login ta validando os dados

		if (!userLogin) {
			console.log('!userLogin');
			loginErrorVisibility = true;
		}

		if (!userPassword) {
			console.log('!userPassword');
			passwordErrorVisibility = true;
		}

		// TODO: Ao digitar algo, sumir com o feedback de dados faltando

		console.log(`aoLogar(${userLogin}, ${userPassword})`);
		let res = await fetch(`http://localhost:5173/api/database/login`, {
			method: 'POST',
			body: JSON.stringify({
				login: userLogin,
				password: userPassword
			})
		});
	}
</script>

<div class="login-container">
	<h1>Bem vindo(a) ao <b>Gameclass</b></h1>
	<span>Sua plataforma online de aprendizado gamificado</span>
	<form class="card-container">
		<div style="display:flex; flex-direction: column;">
			<InputText bind:value={userLogin} placeholder="Nome de usuário / E-mail" />
			{#if loginErrorVisibility}
				<span class="error-login">*Campo obrigatório*</span>
			{/if}
		</div>

		<div style="display:flex; flex-direction: column;">
			<InputPassword bind:value={userPassword} type="password" placeholder="Senha" />
			<div></div>
			{#if loginErrorVisibility}
				<span class="error-password">*Campo obrigatório*</span>
			{/if}
		</div>
		<br />

		<ButtonForm onClick={aoLogar} text="Login" />
		<Button>Criar Conta</Button>
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
		gap: 36px;
	}
</style>
