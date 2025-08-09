<script>
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';
	import { goto } from '$app/navigation';

	export let data;


	let estudantes = data.estudantes;
	if (!$selectedTurmaTabBar) {
		$selectedTurmaTabBar = 3;
	}

	function abrePerfilDoUsuario(estudante) {
		const url = `/professor/turmas/${data.idTurma}/membros/${estudante.id_estudante}`;
		goto(url);
	}
	let sortBy = 'points'; // 'points' ou 'name'

	function ordenaPorPontos() {
		sortBy = 'points';
		estudantes = estudantes.sort((a, b) => b.pontos - a.pontos);
	}

	function ordenaPorNome() {
		sortBy = 'name';
		estudantes = estudantes.sort((a, b) => a.nome.localeCompare(b.nome));
	}

	ordenaPorNome();
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-membros">
	<h1>Membros da turma</h1>
	<div class="sort-buttons">
		<span>Ordenar por:</span>
		<button on:click={ordenaPorNome} class:active={sortBy === 'name'}> Nome (A-Z) </button>
		<button on:click={ordenaPorPontos} class:active={sortBy === 'points'}>
			Pontos (Decrescente)
		</button>
	</div>
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

	.sort-buttons {
		margin-bottom: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sort-buttons button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		background-color: #f0f0f0;
		cursor: pointer;
		border-radius: 5px;
		transition: background-color 0.2s;
	}

	.sort-buttons button:hover {
		background-color: #e0e0e0;
	}

	.sort-buttons button.active {
		background-color: #007bff;
		color: white;
		border-color: #007bff;
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
