<script>
	/**
	 * @typedef {Object} Props
	 * @property {any} icon
	 * @property {any} alt
	 * @property {string} [text]
	 * @property {boolean} [underline]
	 * @property {any} onClick
	 */

	/** @type {Props} */
	let {
		icon,
		alt,
		text = '',
		underline = false,
		onClick
	} = $props();
</script>

<button class="tab" onclick={onClick}>
	<div class="tab-content">
		<img src={icon} {alt} />
		<h2>{text}</h2>
	</div>
	{#if underline}
		<div class="underline perfil"></div>
	{/if}
</button>

<style>
	.tab {
		padding: 4px;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		margin-left: 22px;
	}

	.tab img {
		width: 20px;
		height: 20px;
	}

	.tab-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}

	.underline {
		width: 70%;
		height: 5px;
		align-self: center;
		margin-top: 20px;
		color: var(--cor-primaria);
		background-color: var(--cor-primaria);
		border-radius: 20px;
	}
</style>
