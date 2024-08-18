<script>
	export let img = '';
	export let onClick = (x) => {
		console.log(x);
	};
</script>

<div class="button" on:click={onClick}>
	<img src="{img}.svg" alt="" />
	<h1><slot></slot></h1>
</div>

<style>
	.button {
		width: 162px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		color: white;
		padding: 10px 0px;
		transition: 0.2s;
	}

	.button:hover {
		background-color: rgba(255, 255, 255, 0.2);
		transition: 0.4s;
		cursor: pointer;
	}

	.button > h1 {
		font-size: 16px;
	}
</style>
