<script>
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';

	export let data;

	onMount(async () => {
		if (data.toast === 'login') {
			toast.success('Login realizado com sucesso');
		}
	});
</script>

<Toaster richColors expand position="top-center" closeButton />
<div class="content-container">
	<h1>Olá, {data.username}!</h1>
	<span>escolha seu perfil</span>
	<div class="button-container">
		<form method="POST" action="?/perfil_estudante" class="button-estudante" use:enhance>
			<button class="button-estudante">
				<div>
					{#await import('$lib/assets/icone-aluno.svg') then module}
						<img class="icon" alt="Ícone do perfil de aluno" src={module.default} />
					{/await}
					<h1>Estudante</h1>
				</div>
			</button>
		</form>
		<form method="POST" action="?/perfil_professor" class="button-professor" use:enhance>
			<button class="button-professor">
				<div>
					{#await import('$lib/assets/icone-professor.svg') then module}
						<img class="icon" alt="Ícone do perfil de professor" src={module.default} />
					{/await}
					<h1>Professor</h1>
				</div>
			</button>
		</form>
	</div>
</div>

<style>
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

	button {
		padding: 35px;
		cursor: pointer;
		width: 260px;
		border-radius: 35px;
		color: var(--cor-secundaria);
		background-color: var(--cor-primaria);
		text-decoration: none;
	}

	.button-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-items: center;
		margin-top: 8em;
		gap: 8em;
	}

	.button-estudante {
		border: none;
		background-color: var(--cor-primaria);
		color: var(--cor-secundaria);
	}

	.button-professor {
		border: none;
		background-color: var(--cor-secundaria);
		color: var(--cor-primaria);
	}

	form {
		border-radius: 35px;
	}

	form h1 {
		margin-top: 36px;
		font-weight: 500;
		font-size: 36px;
	}

	form div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
