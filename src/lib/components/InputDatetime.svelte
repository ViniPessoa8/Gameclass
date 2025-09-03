<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [placeholder]
	 * @property {any} value
	 * @property {any} inputHandler
	 * @property {string} [name]
	 * @property {boolean} [borded]
	 */

	/** @type {Props & { [key: string]: any }} */
	let {
		placeholder = '',
		value = $bindable(),
		inputHandler,
		name = '',
		borded = false,
		...rest
	} = $props();
</script>

{#if borded}
	<div class="bord">
		<input
			class="borded"
			type="datetime-local"
			{placeholder}
			bind:value
			onchange={inputHandler}
			{name}
			{...rest}
		/>
	</div>
{:else}
	<input
		type="datetime-local"
		class="unborded"
		{placeholder}
		bind:value
		onchange={inputHandler}
		{name}
		{...rest}
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
