<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
	export let name;
	export let width;
	export let fontSize;
	export let borded = false;
	export let backgroundColor = 'var(--cor-primaria)';
	export let padding = '14px';
	export let fontWeight = '400';
	export let disabled = false;
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
			on:input={inputHandler}
			on:blur
			style="width: {width};background-color: {backgroundColor}; font-size:{fontSize}; font-weight:{fontWeight}"
			{...$$restProps}
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
			on:input={inputHandler}
			on:blur
			style="width: {width}; font-size:{fontSize}"
			{...$$restProps}
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
