<script>
	import { COLORS } from '$lib/constants';
	export let nome_usuario;
</script>

<div class="content-container">
	<h1>Olá, ${nome_usuario}!</h1>
	<span>escolha seu perfil</span>
	<div class="button-container">
		<button class="button-estudante">
			<div>
				<img class="icon" alt="Ícone do perfil de aluno" src="icone-aluno.svg" />
				<h1>Aluno</h1>
			</div>
		</button>
		<button class="button-professor">
			<div>
				<img class="icon" alt="Ícone do perfil de professor" src="icone-professor.svg" />
				<h1>Professor</h1>
			</div>
		</button>
	</div>
</div>

<style lang="scss">
	.content-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		margin-top: 8em;
	}

	.content-container > h1 {
		font-size: 48px;
	}

	.content-container > span {
		font-size: 32px;
	}

	.button-container {
		display: flex;
		flex-direction: row;
		margin-top: 8em;
		gap: 8em;
	}

	button {
		padding: 35px;
		/* padding-left: 80px; */
		/* padding-right: 80px; */
		width: 260px;
		border-radius: 35px;
		color: var(--cor-secundaria);
		background-color: var(--cor-primaria);
		border: 1px solid var(--cor-secundaria);
	}

	button h1 {
		margin-top: 36px;
		font-weight: 500;
		font-size: 36px;
	}

	.button-professor {
		background-color: var(--cor-secundaria);
		color: var(--cor-primaria);
	}
</style>
