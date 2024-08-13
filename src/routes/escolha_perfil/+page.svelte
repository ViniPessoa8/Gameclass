<script>
	import { COLORS } from '$lib/constants';
	export let nome_usuario;
</script>

<div class="content-container">
	<h1>Olá, ${nome_usuario}!</h1>
	<span>escolha seu perfil</span>
	<div class="button-container">
		<button>
			<div class="botao aluno">
				<img class="icon" alt="Ícone do perfil de aluno" />
				<h1>Aluno</h1>
			</div>
		</button>
		<button>
			<div class="botao professor">
				<img class="icon" alt="Ícone do perfil de professor" />
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

	.button-container {
		display: flex;
		flex-direction: row;
		margin-top: 8em;
		gap: 8em;
	}

	button {
		padding: 35px;
		border-radius: 35px;
		color: var(--text-1);
		background-color: var(--cor-primaria);
		border: 1px solid var(--cor-secundaria);
	}
</style>
