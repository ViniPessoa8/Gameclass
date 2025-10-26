<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [placeholder]
	 * @property {any} value
	 * @property {any} inputHandler
	 * @property {string} [name]
	 * @property {boolean} [borded]
	 * @property {boolean} [disabled]
	 */

	/** @type {Props} */
	let {
		placeholder = '',
		value = $bindable(),
		inputHandler,
		name = '',
		borded = false,
		disabled = false,
		...rest
	} = $props();
</script>

{#if borded}
	<div class="bord">
		<input
			{disabled}
			class="borded"
			type="date"
			{placeholder}
			bind:value
			onchange={inputHandler}
			{name}
			{...rest}
		/>
	</div>
{:else}
	<input
		{disabled}
		type="date"
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
