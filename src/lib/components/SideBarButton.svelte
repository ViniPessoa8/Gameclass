<script>
	export let img = '';
	export let type = '';

	export let onClick = (x) => {
		console.log(x);
	};
</script>

<button on:click={onClick} {type}>
	{#await import(`$lib/assets/${img}.svg`) then src}
		<img src={src.default} alt="" />
	{/await}
	<h1><slot></slot></h1>
</button>

<style>
	button {
		width: 162px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		color: white;
		background-color: var(--cor-primaria);
		padding: 10px 0px;
		transition: 0.2s;
		border: none;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
		transition: 0.4s;
		cursor: pointer;
	}

	button > h1 {
		font-size: 16px;
	}
</style>
