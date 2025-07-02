<script>
	import CircularTextIcon from './CircularTextIcon.svelte';

	export let integrante;
</script>

<div class="container">
	<CircularTextIcon backgroundColor={'#' + integrante.cor}>{integrante.nome[0]}</CircularTextIcon>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{integrante.nome} </b></p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--cor-primaria);
		color: white;
		margin: 8px;
		padding: 8px 0px 8px 8px;
		border-radius: 50px;
		gap: 12px;
	}

	.info-container {
		display: flex;
		flex-direction: column;
		padding-right: 30px;
	}
</style>
