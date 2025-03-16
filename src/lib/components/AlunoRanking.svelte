<script>
	import CircularTextIcon from './CircularTextIcon.svelte';

	export let nome = '',
		pontos = 0,
		posicao = 0,
		cor = 'var(--cor-primaria)';
</script>

<div class="container">
	<CircularTextIcon backgroundColor={cor}>{nome[0]}</CircularTextIcon>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{nome} #{posicao}</b></p>
		<p style="font-size: 18px;">{pontos} pts</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
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
