<script>
	import { onDestroy } from 'svelte';

	/**
	 * @type {Array<Object>}
	 * A lista de critérios a ser exibida.
	 * Ex: [{id: 1, titulo: 'Coerência', pontuacao_max: 5.0}]
	 */
	export let criterios = [];

	/**
	 * @type {'top' | 'bottom' | 'left' | 'right'}
	 * A posição do popover em relação ao texto.
	 */
	export let position = 'bottom';

	let isVisible = false;
	let isSticky = false; // Controla se o popover deve ficar fixo após um clique
	let wrapperNode; // Referência ao elemento principal para detectar cliques fora

	// Mostra o popover ao passar o mouse, se não estiver "fixado" por um clique
	function show() {
		if (!isSticky) {
			isVisible = true;
		}
	}

	// Esconde o popover ao tirar o mouse, se não estiver "fixado"
	function hide() {
		if (!isSticky) {
			isVisible = false;
		}
	}

	// Alterna o estado "fixo" do popover ao clicar
	function toggleSticky(event) {
		event.stopPropagation(); // Impede que o clique se propague para o window
		isSticky = !isSticky;
		isVisible = isSticky; // Se ficar fixo, garante que está visível. Se não, esconde.
	}

	// Função para fechar o popover ao clicar fora dele
	function handleClickOutside(event) {
		if (wrapperNode && !wrapperNode.contains(event.target)) {
			isVisible = false;
			isSticky = false;
		}
	}

	// Adiciona e remove o listener de clique no window conforme a visibilidade
	$: if (typeof window !== 'undefined') {
		if (isVisible) {
			window.addEventListener('click', handleClickOutside, true);
		} else {
			window.removeEventListener('click', handleClickOutside, true);
		}
	}

	// Garante a remoção do listener quando o componente é destruído
	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('click', handleClickOutside, true);
		}
	});
</script>

<div class="popover-wrapper" bind:this={wrapperNode} >
	<button
		class="trigger"
		on:click={toggleSticky}
		aria-haspopup="true"
		aria-expanded={isVisible}
		on:mouseenter={show} 
		on:mouseleave={hide}
	>
		Critérios
		<svg
			class="trigger-icon"
			class:open={isVisible}
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	</button>

	{#if isVisible}
		<div class="popover-content {position}" role="tooltip">
			<div class="popover-arrow" />
			<h4 class="popover-title">Critérios de Avaliação</h4>
			{#if criterios && criterios.length > 0}
				<ul class="criterios-list">
					{#each criterios as criterio (criterio.id)}
						<li>
							<span>{criterio.titulo}</span>
							<span>{criterio.descricao}</span>
							<strong>{criterio.pontuacao_max} pts</strong>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="no-criterios">Nenhum critério definido.</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.popover-wrapper {
		position: relative;
		display: inline-block;
	}

	/* ** ESTILOS ATUALIZADOS AQUI ** */
	.trigger {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		background-color: var(--cor-primaria); /* Cor de fundo suave */
		border: 1px solid #dcdfe3;
		border-radius: 20px; /* Bordas arredondadas para o formato "pill" */
		padding: 6px 14px;
		margin: 0;
		cursor: pointer;
		color: white; /* Cor do texto mais escura */
		font-size: 1.5rem; /* Tamanho da fonte ligeiramente maior */
		font-weight: 500; /* Fonte um pouco mais forte */
		font-family: inherit;
		transition: all 0.2s ease-in-out;
	}

	.trigger:hover,
	.trigger:focus {
		background-color: var(--cor-secundaria);
		border-color: #caced1;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		transform: translateY(-1px);
	}

	.trigger-icon {
		transition: transform 0.2s ease-in-out;
	}

	.trigger-icon.open {
		transform: rotate(180deg);
	}
	/* ** FIM DAS ALTERAÇÕES DE ESTILO ** */


	.popover-content {
		position: absolute;
		z-index: 10;
		background-color: white;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		width: max-content;
		min-width: 250px;
		padding: 12px 16px;
	}

	.popover-content.bottom {
		top: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
	}

	.popover-content.top {
		bottom: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
	}

	.popover-arrow {
		content: '';
		position: absolute;
		width: 12px;
		height: 12px;
		background: white;
		border-top: 1px solid #e0e0e0;
		border-left: 1px solid #e0e0e0;
	}

	.popover-content.bottom .popover-arrow {
		top: -7px;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
	}

	.popover-content.top .popover-arrow {
		bottom: -7px;
		left: 50%;
		transform: translateX(-50%) rotate(225deg);
	}

	.popover-title {
		margin: 0 0 10px 0;
		font-size: 1.4rem;
		font-weight: 600;
		color: #333;
		border-bottom: 1px solid #eee;
		padding-bottom: 8px;
	}

	.criterios-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.criterios-list li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.2rem;
	}

	.criterios-list li span {
		color: #555;
		margin-right: 16px;
	}

	.criterios-list li strong {
		color: #333;
		white-space: nowrap;
	}

	.no-criterios {
		font-size: 0.9rem;
		color: #777;
		margin: 0;
		padding: 10px 0;
		text-align: center;
	}
</style>
