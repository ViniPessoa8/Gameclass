<script>
	export let placeholder = '';
	export let value;
	export let name;
	export let width;
	export let borded = false;
</script>

{#if borded}
	<div class="board">
		<input
			class="borded"
			type="number"
			{name}
			{placeholder}
			bind:value
			on:input
			on:blur
			style="width: {width};"
			{...$$restProps}
		/>
	</div>
{:else}
	<input
		class="unborded"
		type="number"
		{name}
		{placeholder}
		bind:value
		on:input
		on:blur
		style="width: {width};"
		{...$$restProps}
	/>
{/if}

<style>
	input {
		border: none;
		font-family: var(--font);
		border-bottom: 1px solid var(--cor-secundaria);
		color: var(--text-1);
		font-size: 24px;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		appearance: none;
		-moz-appearance: textfield;
	}

	.board {
		background-color: var(--cor-primaria);
		padding: 14px;
		border-radius: 12px;
	}

	.borded {
		border-color: #cfd2d5;
		background-color: var(--cor-primaria);
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

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
