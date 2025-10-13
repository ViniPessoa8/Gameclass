<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	/**
	 * @typedef {Object} Props
	 * @property {any} href
	 * @property {string} [backgroundColor]
	 * @property {string} [color]
	 * @property {any} borderRadius
	 * @property {boolean} [disabled]
	 * @property {any} size
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props & { [key: string]: any }} */
	let {
		href,
		backgroundColor = 'var(--cor-secundaria)',
		color = 'var(--cor-primaria)',
		borderRadius,
		title = '',
		disabled = false,
		size,
		children,
		...rest
	} = $props();

	let width = $derived(size ? `${size}px` : undefined);
</script>

<a {href}>
	<button
		class="button"
		class:disabled
		{title}
		{disabled}
		{...rest}
		style:width
		style:height={width}
		style:color
		style:background-color={backgroundColor}
		style:border-radius={borderRadius}
		onclick={bubble('click')}
	>
		{@render children?.()}
	</button>
</a>

<style scoped>
	.button {
		border: none;
		height: 48px;
		width: fit-content;
		font-size: 24px;
		font-family: var(--font);
		font-weight: bold;
		border-radius: 15px;
		padding: 10px 15px;
		display: flex;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	.button:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}

	.button:not(.disabled):hover {
		background-color: #a1a1a1;
		cursor: pointer;
	}

	.button.disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
