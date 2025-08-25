<script>
	export let type = '';
	export let width = '';
	export let height = '';
	export let color = '';
	export let backgroundColor = '';
	export let marginTop = '';
	export let fontSize = '24px';
	export let disabled = false;
	export let fontWeight = 'bold';
</script>

<button
	{type}
	class="button"
	{disabled}
	style:background-color={backgroundColor}
	style:color
	style:margin-top={marginTop}
	style:font-size={fontSize}
	style:width
	style:height
	style:font-weight={fontWeight}
	on:click
	{...$$restProps}
>
	<slot></slot>
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
		color: darkgray;
		background-color: lightgray;
		cursor: default;
	}

	.button:enabled:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}
</style>
