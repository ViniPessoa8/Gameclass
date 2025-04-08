<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
	export let name;
	export let width;
	export let borded = false;
</script>

{#if borded}
	<div class="board" style="width: {width};">
		<input
			class="borded"
			type="text"
			{name}
			{placeholder}
			bind:value
			on:input={inputHandler}
			style="width: {width};"
		/>
	</div>
{:else}
	<input
		class="unborded"
		type="text"
		{name}
		{placeholder}
		bind:value
		on:input={inputHandler}
		style="width: {width};"
	/>
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
