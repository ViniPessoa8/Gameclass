<script>
	let { data } = $props();

	const keys = Object.keys(data);
	const values = Object.values(data);
</script>

<div class="container">
	{#each keys as key, index}
		<div class="col">
			<span class="label">{key}</span>
			<span class="value">{values[index]}</span>
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		background-color: var(--cor-primaria);
		border-radius: 20px;
		color: #fff;
		text-align: center;
		margin: auto;
		min-width: 50rem;
	}

	.col {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 12px;
	}

	.col:not(:last-child)::after {
		content: '';
		position: absolute;
		right: 0;
		height: 72%;
		width: 1px;
		background-color: #007aff;
	}

	.col:nth-child(2) {
		flex: 2;
	}

	.label {
		font-size: 20px;
		color: #b0b0b0;
		margin-bottom: 4px;
	}

	.value {
		font-size: 20px;
		font-weight: bold;
		background-color: var(--cor-secundaria);
		color: #fff;
		padding: 5px 10px;
		border-radius: 12px;
	}
</style>
