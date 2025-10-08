<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	export let isOpen = false;
	export let criteriosDisponiveis = [];
	export let criteriosAtuais = []; // /** NOVO */

	const dispatch = createEventDispatcher();
	let idCriteriosSelecionados = new Set();

	$: idCriteriosAtuais = new Set(criteriosAtuais.map((c) => c.id)); // /** NOVO */

	function toggleSelecao(criterioId, checked) {
		if (checked) {
			idCriteriosSelecionados.add(criterioId);
		} else {
			idCriteriosSelecionados.delete(criterioId);
		}
		idCriteriosSelecionados = idCriteriosSelecionados;
	}

	function handleClose() {
		dispatch('close');
	}

	function handleImport() {
		const criteriosSelecionados = criteriosDisponiveis.filter((c) =>
			idCriteriosSelecionados.has(c.id)
		);
		dispatch('import', criteriosSelecionados);
		idCriteriosSelecionados.clear();
		handleClose();
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<div class="modal-overlay" on:click={handleClose} role="presentation"></div>

	<div class="modal-container" role="dialog" aria-modal="true">
		<header class="modal-header">
			<h2 class="modal-title">Copiar critérios de outra atividade</h2>
			<button class="close-button" on:click={handleClose} aria-label="Fechar modal">&times;</button>
		</header>

		<div class="modal-body">
			{#if criteriosDisponiveis.length > 0}
				<ul class="criterios-list">
					{#each criteriosDisponiveis as criterio (criterio.id)}
						{@const jaAdicionado = idCriteriosAtuais.has(criterio.id)}
						<li>
							<label
								class="criterio-item"
								class:disabled={jaAdicionado}
								title={jaAdicionado ? 'Este critério já foi adicionado' : ''}
							>
								<input
									type="checkbox"
									disabled={jaAdicionado}
									on:change={(e) => toggleSelecao(criterio.id, e.currentTarget.checked)}
								/>
								<div class="criterio-info">
									<span class="criterio-titulo">
										{#if criterio.peso != null}
											{criterio.titulo} - <strong>{criterio.pontuacao_max} pts </strong> (Peso {criterio.peso})
										{:else}
											{criterio.titulo} - <strong>{criterio.pontuacao_max} pts</strong>
										{/if}
										{#if jaAdicionado}
											<span class="tag-adicionado">(Já adicionado)</span>
										{/if}
									</span>
									<span class="criterio-descricao">
										{criterio.descricao}
									</span>
									<span class="criterio-origem">
										Origem: {criterio.nome_atividade} | {criterio.nome_turma} - {criterio.ano}
									</span>
								</div>
							</label>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="empty-state">Nenhum critério de outras atividades foi encontrado.</p>
			{/if}
		</div>

		<footer class="modal-footer">
			<Button on:click={handleClose} type="secondary">Cancelar</Button>
			<Button
				on:click={handleImport}
				disabled={idCriteriosSelecionados.size === 0}
				title={idCriteriosSelecionados.size === 0
					? 'Selecione ao menos um critério para importar'
					: ''}
			>
				Importar ({idCriteriosSelecionados.size})
			</Button>
		</footer>
	</div>
{/if}

<style>
	/* ... (estilos anteriores) ... */

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 999;
	}

	.modal-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #ffffff;
		border-radius: 12px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		width: 90%;
		max-width: 550px;
		display: flex;
		flex-direction: column;
		max-height: 80vh;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 24px;
		border-bottom: 1px solid #e0e0e0;
	}

	.modal-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: #333;
		margin: 0;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 2rem;
		line-height: 1;
		cursor: pointer;
		color: #888;
		padding: 0;
	}

	.close-button:hover {
		color: #333;
	}

	.modal-body {
		padding: 24px;
		overflow-y: auto;
		flex-grow: 1;
	}

	.criterios-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.criterio-item {
		display: flex;
		align-items: center;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 8px;
		cursor: pointer;
		transition:
			background-color 0.2s,
			border-color 0.2s;
	}

	.criterio-item:hover {
		background-color: #f7f7f7;
		border-color: #007bff;
	}

	/** NOVO: Estilos para o item desabilitado */
	.criterio-item.disabled {
		background-color: #f0f0f0;
		border-color: #e0e0e0;
		cursor: not-allowed;
		color: #999;
	}

	.criterio-item.disabled:hover {
		border-color: #e0e0e0; /* Impede a mudança de cor da borda no hover */
	}

	.criterio-item.disabled .criterio-titulo,
	.criterio-item.disabled .criterio-origem,
	.criterio-item.disabled .criterio-descricao {
		color: #999;
	}
	/** FIM dos novos estilos */

	.criterio-item input[type='checkbox'] {
		width: 20px;
		height: 20px;
		margin-right: 16px;
		flex-shrink: 0;
	}

	.criterio-info {
		display: flex;
		flex-direction: column;
	}

	.criterio-titulo {
		font-size: 1rem;
		color: #333;
		font-weight: 500;
	}

	/** NOVO: Estilo para a tag '(Já adicionado)' */
	.tag-adicionado {
		font-size: 0.8rem;
		font-weight: normal;
		color: #555;
		margin-left: 8px;
	}
	/** FIM do novo estilo */

	.criterio-descricao {
		font-size: 0.9rem;
		color: #666; /* Cor ligeiramente mais suave */
		margin-top: 4px;
	}

	.criterio-origem {
		font-size: 0.8rem;
		color: #777;
		margin-top: 4px;
	}

	.empty-state {
		text-align: center;
		color: #666;
		padding: 20px 0;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding: 16px 24px;
		border-top: 1px solid #e0e0e0;
		background-color: #f9f9f9;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
	}
</style>
