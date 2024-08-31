<script>
	export let type = '';
	export let color = '';
	export let backgroundColor = '';
</script>

<button {type} class="button" style="background-color: {backgroundColor}; color: {color}" on:click>
	<slot></slot>
</button>

<style>
	.button {
		border: none;
		height: 48px;
		width: fit-content;
		font-size: 24px;
		font-family: var(--font);
		font-weight: bold;
		color: var(--cor-primaria);
		border-radius: 15px;
		padding: 10px 15px;
	}

	.button:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}
</style>
