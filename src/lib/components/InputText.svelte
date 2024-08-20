<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
	export let name;
</script>

<input type="text" {name} {placeholder} bind:value on:input={inputHandler} />

<style>
	input {
		border: none;
		font-family: var(--font);
		border-bottom: 1px solid var(--cor-secundaria);
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
	}

	input:focus {
		outline: none;
	}

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
