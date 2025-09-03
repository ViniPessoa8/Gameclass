<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [placeholder]
	 * @property {any} value
	 * @property {any} [inputHandler]
	 * @property {any} [onFocusOut]
	 * @property {string} [autocomplete]
	 * @property {string} [name]
	 */

	/** @type {Props} */
	let {
		placeholder = '',
		value = $bindable(),
		inputHandler = null,
		onFocusOut = null,
		autocomplete = 'new-password',
		name = ''
	} = $props();
</script>

<input
	class="input"
	type="password"
	{autocomplete}
	{name}
	{placeholder}
	bind:value
	oninput={inputHandler}
	onfocusout={onFocusOut}
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
