<script>
	import { tick } from 'svelte';

	let {
		optionList,
		inputHandler = () => {},
		value = $bindable(),
		name = '',
		borded = false,
		placeholder = 'Selecione uma opção',
		width = '100%'
	} = $props();

	let searchTerm = $state('');
	let isOpen = $state(false);
	let componentEl = $state(null); // Referência ao elemento principal do componente

	// Sincroniza o texto de busca com o valor externo quando o componente é montado ou o valor muda
	$effect(() => {
		searchTerm = value || '';
	});

	// Filtra a lista de opções com base no que foi digitado
	const filteredOptions = $derived(
		optionList.filter((opt) => opt.toLowerCase().includes(searchTerm.toLowerCase()))
	);

	function selectOption(opt) {
		value = opt; // Atualiza o valor (bindable)
		searchTerm = opt;
		isOpen = false;

		// Dispara o handler original, se existir, para manter a compatibilidade
		// Criamos um evento "fake" para passar para a função
		const fakeEvent = {
			target: { value: opt },
			currentTarget: { value: opt }
		};
		inputHandler(fakeEvent);
	}

	function handleFocus() {
		isOpen = true;
	}

	function handleInput(event) {
		searchTerm = event.target.value;
		// Se o usuário apagar o texto, o valor selecionado deve ser limpo
		if (searchTerm === '') {
			value = '';
		}
	}

	function handleClickOutside(event) {
		if (componentEl && !componentEl.contains(event.target)) {
			isOpen = false;
			// Se o dropdown for fechado sem uma seleção válida, volta a exibir o valor selecionado
			if (value) {
				searchTerm = value;
			} else {
				searchTerm = '';
			}
		}
	}

	// Adiciona px se a largura for um número
	const componentWidth = $derived(typeof width === 'number' ? `${width}px` : width);
</script>

<svelte:window on:click={handleClickOutside} />

<div bind:this={componentEl} class="select-container" style="width: {componentWidth};">
	<input
		type="text"
		{name}
		class:borded
		class:unborded={!borded}
		{placeholder}
		bind:value={searchTerm}
		on:focus={handleFocus}
		on:input={handleInput}
	/>

	{#if isOpen}
		<div class="options-container">
			{#each filteredOptions as opt (opt)}
				<div class="option" on:click={() => selectOption(opt)} on:mousedown|preventDefault>
					{opt}
				</div>
			{:else}
				<div class="no-options">Nenhum resultado encontrado.</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.select-container {
		position: relative;
		font-family: var(--font);
		color: var(--text-1);
	}

	input {
		width: 100%;
		border: none;
		font-family: var(--font);
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
		box-sizing: border-box; /* Garante que padding não afete a largura total */
	}

	input:focus {
		outline: none;
	}

	/* Estilos mantidos do seu componente original */
	.borded {
		background-color: var(--cor-primaria);
		padding: 14px;
		border-radius: 12px;
	}

	.unborded {
		padding: 14px 0;
		border-bottom: 1px solid var(--cor-secundaria);
	}

	/* Container para as opções que aparecem abaixo do input */
	.options-container {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: var(--cor-secundaria);
		border: 1px solid var(--cor-primaria);
		border-radius: 8px;
		margin-top: 4px;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.option {
		padding: 12px 16px;
		cursor: pointer;
		font-size: 20px;
		transition: background-color 0.2s;
	}

	.option:hover {
		background-color: var(--cor-primaria);
	}

	.no-options {
		padding: 12px 16px;
		font-size: 20px;
		color: #888;
		cursor: default;
	}
</style>
