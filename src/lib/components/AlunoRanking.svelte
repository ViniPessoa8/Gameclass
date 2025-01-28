<script>
	import CircularTextIcon from './CircularTextIcon.svelte';

	export let nome = '',
		pontos = 0,
		posicao = 0,
		cor = 'var(--cor-primaria)';
</script>

<div class="container">
	<CircularTextIcon backgroundColor={cor}>{nome[0]}</CircularTextIcon>
	<div style="display: flex; flex-direction: column;">
		<p style="font-size: 24px;"><b>{nome} #{posicao}</b></p>
		<p style="font-size: 20px;">{pontos} pts</p>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		background-color: white;
		margin: 8px;
		padding: 8px 0px 8px 8px;
		border-radius: 50px;
		gap: 12px;
	}
</style>
