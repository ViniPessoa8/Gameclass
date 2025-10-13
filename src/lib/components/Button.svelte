<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	/**
	 * @typedef {Object} Props
	 * @property {string} [type]
	 * @property {string} [width]
	 * @property {string} [height]
	 * @property {string} [color]
	 * @property {string} [backgroundColor]
	 * @property {string} [marginTop]
	 * @property {string} [fontSize]
	 * @property {boolean} [disabled]
	 * @property {string} [fontWeight]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let {
		type = '',
		width = '',
		height = '',
		color = '',
		backgroundColor = '',
		marginTop = '',
		fontSize = '24px',
		disabled = false,
		fontWeight = 'bold',
		title = '',
		children,
		...rest
	} = $props();
</script>

<button
	{type}
	class="button"
	{disabled}
	style:background-color={disabled ? 'lightgray' : backgroundColor}
	style:color={disabled ? 'darkgray' : color}
	style:margin-top={marginTop}
	style:font-size={fontSize}
	style:width
	style:height
	style:font-weight={fontWeight}
	onclick={bubble('click')}
	{title}
	{...rest}
>
	{@render children?.()}
</button>

<style>
	.button {
		border: none;
		font-family: var(--font);
		color: var(--cor-primaria);
		border-radius: 15px;
		padding: 10px 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.button:disabled {
		cursor: default;
	}

	.button:enabled:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}
</style>
