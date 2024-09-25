<script>
	export let value,
		inputHandler,
		name,
		backgroundColor = 'transparent',
		textColor = 'var(--text-1)',
		placeholder = '';
</script>

<div
	class="container"
	style="
	background-color: {backgroundColor};
	"
>
	<textarea
		{name}
		{placeholder}
		bind:value
		on:input={inputHandler}
		style="
			color: {textColor};
			background-color: {backgroundColor};
		"
	/>
</div>

<style>
	textarea {
		border: none;
		font-family: var(--font);
		font-size: 24px;
		height: 100%;
		max-width: 400px;
		max-height: 100px;
		resize: none;
	}

	textarea:focus {
		outline: none;
	}

	::placeholder {
		color: var(--cor-secundaria);
	}

	.container {
		border: 1px solid var(--cor-secundaria);
		border-radius: 8px;
		padding: 8px;
	}
</style>
