<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
	export let name = '';
	export let borded = false;
</script>

{#if borded}
	<div class="bord">
		<input
			class="borded"
			type="datetime-local"
			{placeholder}
			bind:value
			on:change={inputHandler}
			{name}
		/>
	</div>
{:else}
	<input
		type="datetime-local"
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

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
