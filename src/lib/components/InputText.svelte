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
</script>

{#if borded}
	<div class="board" style="width: {width}; background-color: {backgroundColor}; padding:{padding}">
		<input
			class="borded"
			type="text"
			{name}
			{placeholder}
			bind:value
			on:input={inputHandler}
			style="width: {width};background-color: {backgroundColor}; font-size:{fontSize}"
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
			bind:value
			on:input={inputHandler}
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

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
