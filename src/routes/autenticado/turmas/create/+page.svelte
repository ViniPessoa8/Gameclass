<script>
	import InputText from '$lib/components/InputText.svelte';
	import InputDate from '$lib/components/InputDate.svelte';
	import Button from '$lib/components/Button.svelte';

	let titulo,
		descricao,
		prazo = '';
</script>

<div class="form-container">
	<h1>Criação de nova turma</h1>
	<form>
		<div class="row">
			<h2>Titulo da atividade:</h2>
			<InputText borded name="titulo" bind:value={titulo} />
		</div>
		<div class="row">
			<h2>Descrição:</h2>
			<InputText borded name="descricao" bind:value={descricao} />
		</div>
		<div class="row">
			<h2>Prazo:</h2>
			<InputDate borded name="prazo" bind:value={prazo} />
		</div>

		<div class="row" style="align-self: center;">
			<Button backgroundColor="var(--cor-secundaria)" color="var(--cor-primaria)">Próximo</Button>
		</div>
	</form>
</div>

<style>
	.form-container {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: end;
	}

	h1 {
		margin-bottom: 30px;
	}
	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		margin-top: 30px;
	}
</style>
