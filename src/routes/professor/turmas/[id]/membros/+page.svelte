<script>
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let { data } = $props();

	// Estado para as preferências do usuário, inicializado com padrões seguros para o servidor.
	let sortBy = $state('name');
	let viewMode = $state('grid');

	// Esta variável irá conter a lista final e ordenada para renderização.
	let estudantes = $state([]);

	// Estado para controlar a renderização e evitar problemas de hidratação.
	let isMounted = $state(false);

	// No onMount (apenas no lado do cliente), carrega as preferências e atualiza o estado.
	onMount(() => {
		sortBy = localStorage.getItem('membrosSortBy') || 'name';
		viewMode = localStorage.getItem('membrosViewMode') || 'grid';
		isMounted = true; // Sinaliza que agora estamos seguros no cliente com o estado carregado.
	});

	// Este efeito é executado sempre que os dados de origem ou a preferência de ordenação mudam.
	// Ele recalcula a lista ordenada.
	$effect(() => {
		if (!data.estudantes) {
			estudantes = [];
			return;
		}
		const estudantesCopia = [...data.estudantes];
		if (sortBy === 'points') {
			estudantesCopia.sort((a, b) => b.pontos - a.pontos);
		} else {
			// 'name'
			estudantesCopia.sort((a, b) => a.nome.localeCompare(b.nome));
		}
		estudantes = estudantesCopia;
	});

	// Este efeito salva as preferências de volta no localStorage.
	// Ele só é executado depois que o componente é montado, para evitar sobrescrever os valores armazenados com os padrões.
	$effect(() => {
		if (isMounted) {
			localStorage.setItem('membrosSortBy', sortBy);
			localStorage.setItem('membrosViewMode', viewMode);
		}
	});

	if (!$selectedTurmaTabBar) {
		$selectedTurmaTabBar = 3;
	}

	function abrePerfilDoUsuario(estudante) {
		const url = `/professor/turmas/${data.idTurma}/membros/${estudante.id_estudante}`;
		goto(url);
	}
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-membros">
	<h1>Membros da turma</h1>

	{#if data.estudantes.length == 0}
		<h2>(Não há estudantes na turma)</h2>
	{:else}
		<div class="filtros">
			<!-- Container para todos os controles de filtro e visualização -->
			<div class="controls-container">
				<div class="sort-buttons">
					<span>Ordenar por:</span>
					<button onclick={() => (sortBy = 'name')} class:active={sortBy === 'name'}>
						Nome (A-Z)
					</button>
					<button onclick={() => (sortBy = 'points')} class:active={sortBy === 'points'}>
						Pontos (Decrescente)
					</button>
				</div>

				<div class="view-buttons">
					<span>Exibir como:</span>
					<button onclick={() => (viewMode = 'grid')} class:active={viewMode === 'grid'}>
						Grade
					</button>
					<button onclick={() => (viewMode = 'list')} class:active={viewMode === 'list'}>
						Lista
					</button>
				</div>
			</div>
		</div>

		<!-- Container dos membros com classe dinâmica para o modo de visualização -->
		<div class="membros-container" class:list={viewMode === 'list'}>
			{#each estudantes as estudante}
				<button
					class="membro-container"
					onclick={() => {
						abrePerfilDoUsuario(estudante);
					}}
				>
					<div class="membro-icon">
						<CircularTextIcon backgroundColor="#{estudante.cor}"
							>{estudante.nome[0]}</CircularTextIcon
						>
					</div>
					<div class="membro-info">
						<p class="membro-nome">{estudante.nome}</p>
						<p class="membro-pontuacao">{estudante.pontos} pontos</p>
					</div>
				</button>
			{/each}
		</div>
	{/if}
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

	.controls-container {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 2rem;
		flex-wrap: wrap;
	}

	/* Estilo padrão em Grade */
	.membros-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 24px;
		width: 100%;
		margin-top: 24px;
		color: white;
	}

	/* Modificador para visualização em Lista */
	.membros-container.list {
		display: flex;
		flex-direction: column;
		gap: 16px;
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
		transition: transform 0.2s ease-in-out;
	}

	.membro-container:hover {
		transform: translateY(-4px);
	}

	.sort-buttons,
	.view-buttons {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.sort-buttons button,
	.view-buttons button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		background-color: #f0f0f0;
		cursor: pointer;
		border-radius: 5px;
		font-family: var(--font);
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	.sort-buttons button:hover,
	.view-buttons button:hover {
		background-color: #e0e0e0;
	}

	.sort-buttons button.active,
	.view-buttons button.active {
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
		align-items: center;
		justify-content: center;
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

	.filtros {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
