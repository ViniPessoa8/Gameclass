<script>
	export let realizacao;
	export let prazo;
	export let avaliacao;
</script>

<div class="container">
	<div class="col">
		<span class="label">Realização</span>
		<span class="value">{realizacao}</span>
	</div>
	<div class="col">
		<span class="label">Prazo</span>
		<span class="value">{prazo}</span>
	</div>
	<div class="col">
		<span class="label">Avaliação</span>
		<span class="value">{avaliacao}</span>
	</div>
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
		max-width: 50rem;
	}

	.col {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
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
