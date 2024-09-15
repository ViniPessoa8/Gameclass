<script>
	export let options = [];
	let group = [];
	console.log(options);
</script>

<div class="container">
	{#each options as option}
		<div class="row">
			<input name={option.name} bind:group id={option.name} type="radio" value={option.text} />
			<label for={option.name}>{option.text}</label>
		</div>
	{/each}
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
