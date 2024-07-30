<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
</script>

<input type="date" {placeholder} bind:value on:change={inputHandler} />

<style>
	input {
		font-family: var(--font);
	}

	input {
		border: none;
		font-family: var(--font);
		border-bottom: 1px solid var(--cor-secundaria);
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

