<script>
	export let placeholder = '';
	export let value;
	export let inputHandler = null;
	export let onFocusOut = null;
	export let autocomplete = 'new-password';
	export let name = '';
</script>

<input
	class="input"
	type="password"
	{autocomplete}
	{name}
	{placeholder}
	bind:value
	on:input={inputHandler}
	on:focusout={onFocusOut}
/>

<style>
	.input {
		border: none;
		font-family: var(--font);
		border-bottom: 1px solid var(--cor-secundaria);
		background-color: transparent;
		color: var(--text-1);
		font-size: 24px;
	}

	.input:focus {
		outline: none;
	}

	::placeholder {
		color: var(--cor-secundaria);
	}
</style>
