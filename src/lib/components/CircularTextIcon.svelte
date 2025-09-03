<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [color]
	 * @property {number} [size]
	 * @property {number} [fontSize]
	 * @property {any} [backgroundColor]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		color = 'white',
		size = 60,
		fontSize = 30,
		backgroundColor = getComputedStyle(document.body).getPropertyValue('--cor-primaria'),
		children
	} = $props();
</script>

<div
	class="icon"
	style="
		background-color: {backgroundColor}; 
		color: {color};
		height: {size}px;
		width: {size}px;
		"
>
	<h1 class="info" style="font-size: {fontSize}px;">
		{@render children?.()}
	</h1>
</div>

<style>
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
	}

	.icon > .info {
		text-align: center;
		justify-self: center;
		width: 220px;
	}
</style>
