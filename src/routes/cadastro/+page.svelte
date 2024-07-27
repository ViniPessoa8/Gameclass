<script>
	import Button from '$lib/components/Button.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import Select from '$lib/components/Select.svelte';

	function aoCriarConta() {
		alert(nomeCompleto);
	}

	let nomeCompleto,
		usuario,
		senha,
		repetirSenha,
		instituicao,
		dtNasc = '';
	let selectOptionList = ['24', '420', '69', 'EST - UEA'];
</script>

<div class="login-container">
	<h1>Cadastre-se no <b>Gameclass</b></h1>
	<span>e descubra uma nova experiência de aprendizado</span>
	<div class="card-container">
		<InputText type="text" placeholder="Nome Completo" bind:value={nomeCompleto} />
		<InputText type="text" placeholder="Usuário" bind:value={usuario} />
		<InputText type="text" placeholder="Senha" bind:value={senha} />
		<InputText type="text" placeholder="Repetir senha" bind:value={repetirSenha} />
		<!-- <InputText type="text" placeholder="Instituição" bind:value={instituicao}/> -->
		<Select optionList={selectOptionList} />
		<!-- <InputText type="text" placeholder="Data de Nascimento" bind:value={dtNasc}/> -->
		<InputDate />
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

	span {
		margin-top: 18px;
		font-size: 30px;
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
		gap: 36px;
	}
</style>
