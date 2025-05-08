<script>
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	export let data;

	$: estudantes = data.estudantes;
	if (!$selectedTurmaTabBar) {
		$selectedTurmaTabBar = 3;
	}

	function abrePerfilDoUsuario(estudante) {
		console.debug('Abre perfil de ', estudante.nome);
	}
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-membros">
	<h1>Membros da turma</h1>
	<div class="membros-container">
		{#each estudantes as estudante}
			<button
				class="membro-container"
				on:click={() => {
					abrePerfilDoUsuario(estudante);
				}}
			>
				<div class="membro-icon">
					<CircularTextIcon backgroundColor="#{estudante.cor}">{estudante.nome[0]}</CircularTextIcon
					>
				</div>
				<div class="membro-info">
					<p class="membro-nome">{estudante.nome}</p>
					<p class="membro-pontuacao">{estudante.pontos} pontos</p>
				</div>
			</button>
		{/each}
	</div>
</div>

<style scoped>
	.content-membros {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 24px;
		padding: 24px 128px;
	}

	.membros-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 24px;
		width: 100%;
		margin-top: 48px;
		color: white;
	}

	.membro-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background-color: var(--cor-primaria);
		padding: 12px 12px 12px 0px;
		border: none;
		cursor: pointer;
	}

	.membro-info > p {
		text-align: start;
		font-family: var(--font);
	}

	.membro-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		text-align: center;
		padding: 0px 12px;
	}

	.membro-info {
		display: flex;
		flex-direction: column;
	}

	.membro-nome {
		color: white;
		font-size: 24px;
		font-weight: 600;
		margin: 0;
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.membro-pontuacao {
		color: darkgray;
		font-size: 18px;
	}
</style>
