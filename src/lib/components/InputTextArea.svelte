<script>
	export let placeholder = '';
	export let value;
	export let inputHandler;
	export let name;
</script>

<textarea {name} {placeholder} bind:value on:input={inputHandler} />

<style>
	textarea {
		border: none;
		font-family: var(--font);
		border: 1px solid var(--cor-secundaria);
		border-radius: 8px;
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
	}

	textarea:focus {
		outline: none;
	}

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
