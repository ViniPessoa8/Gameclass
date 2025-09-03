<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	/**
	 * @typedef {Object} Props
	 * @property {string} [placeholder]
	 * @property {any} value
	 * @property {any} inputHandler
	 * @property {any} name
	 * @property {any} width
	 * @property {any} fontSize
	 * @property {boolean} [borded]
	 * @property {string} [backgroundColor]
	 * @property {string} [padding]
	 * @property {string} [fontWeight]
	 * @property {boolean} [disabled]
	 */

	/** @type {Props & { [key: string]: any }} */
	let {
		placeholder = '',
		value = $bindable(),
		inputHandler,
		name,
		width,
		fontSize,
		borded = false,
		backgroundColor = 'var(--cor-primaria)',
		padding = '14px',
		fontWeight = '400',
		disabled = false,
		...rest
	} = $props();
</script>

{#if borded}
	<div
		class="board"
		style="width: {width}; background-color: {backgroundColor}; padding:{padding}; font-weight:{fontWeight}"
	>
		<input
			class="borded"
			type="text"
			{name}
			{placeholder}
			{disabled}
			bind:value
			oninput={inputHandler}
			onblur={bubble('blur')}
			style="width: {width};background-color: {backgroundColor}; font-size:{fontSize}; font-weight:{fontWeight}"
			{...rest}
		/>
	</div>
{:else}
	<div class="unboard" style="width: {width}; ">
		<input
			class="unborded"
			type="text"
			{name}
			{placeholder}
			{disabled}
			bind:value
			oninput={inputHandler}
			onblur={bubble('blur')}
			style="width: {width}; font-size:{fontSize}"
			{...rest}
		/>
	</div>
{/if}

<style>
	input {
		width: 100%;
		border: none;
		font-family: var(--font);
		border-bottom: 1px solid var(--cor-secundaria);
		color: var(--text-1);
		font-size: 24px;
	}

	.board {
		width: 100%;
		border-radius: 12px;
	}

	.borded {
		border-color: #cfd2d5;
	}

	.borded:focus {
		border-color: var(--cor-secundaria);
	}

	.unborded {
		background-color: transparent;
	}

	input:focus {
		outline: none;
	}

	input:disabled {
		background-color: #f0f0f0; /* Um cinza claro padrão para desabilitado */
		border-color: #dcdcdc;
		color: #a1a1a1; /* Cor do texto mais clara */
		cursor: not-allowed; /* Cursor indica que não é clicável */
	}

	/* Opcional: Estilizar também o placeholder do campo desabilitado */
	input:disabled::placeholder {
		color: #b3b3b3;
	}

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
