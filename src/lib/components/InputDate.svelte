<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
	export let name = '';
	export let borded = false;
	export let disabled = false;
</script>

{#if borded}
	<div class="bord">
		<input
			{disabled}
			class="borded"
			type="date"
			{placeholder}
			bind:value
			on:change={inputHandler}
			{name}
		/>
	</div>
{:else}
	<input
		{disabled}
		type="date"
		class="unborded"
		{placeholder}
		bind:value
		on:change={inputHandler}
		{name}
	/>
{/if}

<style>
	.bord {
		background-color: var(--cor-primaria);
		padding: 14px;
		border-radius: 12px;
	}

	input {
		border: none;
		font-family: var(--font);
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
		color-scheme: dark;
	}

	input:focus {
		outline: none;
	}

	input:disabled {
		background-color: #f0f0f0;
		border-color: #dcdcdc;
		color: #a1a1a1;
		cursor: not-allowed;
	}

	input:disabled::placeholder {
		color: #b3b3b3;
	}

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
