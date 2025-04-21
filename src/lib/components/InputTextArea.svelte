<script>
	export let value,
		inputHandler,
		name,
		backgroundColor = 'transparent',
		textColor = 'var(--text-1)',
		borded = false,
		width,
		height,
		fontSize,
		placeholder = '';

	if (borded) {
		backgroundColor = 'var(--cor-primaria)';
		backgroundColor = 'var(--cor-primaria)';
	}
</script>

<div
	class="container"
	style="
	width: {width};
	height: {height};
	background-color: {backgroundColor};
	"
>
	<textarea
		{name}
		{placeholder}
		bind:value
		on:input={inputHandler}
		style="
			width: 100%;
			heigth: {height};
			color: {textColor};
			background-color: {backgroundColor};
			font-size:{fontSize}
		"
	/>
</div>

<style>
	textarea {
		border: none;
		font-family: var(--font);
		font-size: 24px;
		height: 100%;
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

	.board {
		width: 100%;
		background-color: var(--cor-primaria);
		padding: 14px;
		border-radius: 12px;
	}

	.borded {
		border-color: #cfd2d5;
		background-color: var(--cor-primaria);
	}

	.borded:focus {
		border-color: var(--cor-secundaria);
	}

	.unborded {
		background-color: transparent;
	}
</style>
