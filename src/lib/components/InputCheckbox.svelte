<script>
	/**
	 * @typedef {Object} Props
	 * @property {any} text
	 * @property {any} name
	 * @property {any} checked
	 * @property {boolean} [disabled]
	 */

	/** @type {Props} */
	let { text, name, checked = $bindable(), disabled = false, fontSize } = $props();
</script>

<div class="container">
	<div class="row">
		<input {name} type="checkbox" {disabled} value={text} bind:checked />
		<p style="font-size: {fontSize}">{text}</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: center;
		gap: 8px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	/* input[type='radio'] { */
	/* 	width: 1.3em; */
	/* 	height: 1.3em; */
	/* } */
</style>
