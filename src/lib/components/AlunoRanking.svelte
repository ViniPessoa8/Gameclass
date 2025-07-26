<script>
	import CircularTextIcon from './CircularTextIcon.svelte';
	import { goto } from '$app/navigation';

	export let nome = '',
		pontos = 0,
		posicao = 0,
		cor = 'var(--cor-primaria)',
		idEstudante = 0,
		idTurma = 0;

	function onClick() {
		const url = `/professor/turmas/${idTurma}/membros/${idEstudante}`;
		goto(url);
	}
</script>

<button class="container" on:click={onClick}>
	<CircularTextIcon backgroundColor={cor}>{nome[0]}</CircularTextIcon>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{posicao}º {nome}</b></p>
		<p style="font-size: 18px;">{pontos} pts</p>
	</div>
</button>

<style>
	.container {
		border: none;
		width: 301px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		margin: 8px;
		padding: 8px 0px 8px 8px;
		border-radius: 50px;
		gap: 12px;
		cursor: pointer;
		color: var(--cor-primaria);
	}

	.info-container {
		display: flex;
		flex-direction: column;
		padding-right: 30px;
		text-align: center;
		width: 100%;
	}
</style>
