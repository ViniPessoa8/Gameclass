<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [color]
	 * @property {string} [backgroundColor]
	 * @property {number} [size]
	 * @property {number} [fontSize]
	 * @property {any} src
	 * @property {any} alt
	 * @property {string} [text]
	 * @property {string} [type]
	 */

	/** @type {Props} */
	let {
		color = 'white',
		backgroundColor = 'var(--cor-primaria)',
		size = 60,
		fontSize = 30,
		src,
		alt,
		text = '',
		type = 'img'
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
	{#if type === 'img'}
		<img {src} {alt} />
	{:else if type === 'text'}
		<h2 style="font-size: {fontSize}px;">
			{text}
		</h2>
	{/if}
</div>

<style>
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100%;
	}

	.icon > img {
		align-self: center;
		justify-self: center;
	}

	.icon > h2 {
		text-align: center;
		justify-self: center;
		width: 220px;
	}
</style>
