<script>
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import icon_atividade_turma from '$lib/assets/icon_atividade_turma.png';
	import icon_seta_cima from '$lib/assets/icon_seta_cima.png';

	let width = 0;
</script>

<!-- TODO: Toggle Button para abrir as etapas -->
<div class="atividade-container" bind:clientWidth={width}>
	{#if width > 0}
		<BarraDeProgresso {width} />
	{/if}
	<div class="atividade-info">
		<CircularIcon src={icon_atividade_turma} alt="Ícone de atividades da turma" />
		<!-- <CircularIcon> -->
		<div class="column">
			<h1>Avaliação Parcial 1</h1>
			<span>Individual</span>
		</div>
		<span>Prazo: 16/07/2023</span>
		<img src={icon_seta_cima} alt="Seta para abrir a turma" />
		<!-- TODO: Etapas -->
	</div>
</div>

<style>
	.atividade-container {
		width: 50%;
	}

	.atividade-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
	}

	.atividade-info > span {
		margin-left: auto;
	}

	.atividade-info > img {
		margin-left: 12px;
	}

	.column {
		margin-left: 24px;
		display: flex;
		flex-direction: column;
	}
</style>
