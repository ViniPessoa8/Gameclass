<script>
	export let type = '';
	export let color = '';
	export let backgroundColor = '';
	export let marginTop = '';
	export let fontSize = '24px';
</script>

<button
	{type}
	class="button"
	style="background-color: {backgroundColor}; color: {color}; margin-top: {marginTop}; font-size: {fontSize}"
	on:click
>
	<slot></slot>
</button>

<style>
	.button {
		border: none;
		height: 48px;
		width: fit-content;
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
