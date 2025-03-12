<script>
	import CircularIcon from '$lib/components/CircularIcon.svelte';

	export let nome = '';
	export let data = '';
	export let texto = '';
</script>

<div class="container">
	<CircularIcon text={nome[0]} type="text" />
	<div class="content">
		<div class="titulo-data">
			<p><b>{nome}</b></p>
			<p class="data">{data}</p>
		</div>
		<p>{texto}</p>
	</div>
</div>

<style scoped>
	.container,
	.titulo-data {
		display: flex;
		flex-direction: row;
	}

	.container {
		width: 100%;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-left: 12px;
		gap: 8px;
	}

	.titulo-data {
		width: 100%;
		justify-content: space-between;
	}

	.data {
		text-align: right;
	}
</style>
