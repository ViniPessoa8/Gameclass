<script>
	export let text, name, checked;
	export let disabled = false;
</script>

<div class="container">
	<div class="row">
		<input {name} type="checkbox" {disabled} value={text} bind:checked />
		<p>{text}</p>
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
