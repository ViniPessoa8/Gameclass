<script>
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import icon_atividade_turma from '$lib/assets/icon_atividade_turma.png';
	import icon_seta_cima from '$lib/assets/icon_seta_cima.png';
	import Etapa from './Etapa.svelte';

	let width = 0;
</script>

<!-- TODO: Toggle Button para abrir as etapas -->
<div class="atividade-container" bind:clientWidth={width}>
	<BarraDeProgresso {width} />
	<div class="atividade-info">
		<CircularIcon src={icon_atividade_turma} alt="Ícone de atividades da turma" />
		<div class="column">
			<h2>Avaliação Parcial 1</h2>
			<span>Individual</span>
		</div>
		<span>Prazo: 16/07/2023</span>
		<img src={icon_seta_cima} alt="Seta para abrir a turma" />
	</div>
	<!-- TODO: Etapas as component (parameter: list of etapas)-->
	<div class="etapas">
		<h2>Etapas</h2>
		<hr />
		<div class="etapas-container">
			<Etapa status="entregue" />
			<Etapa status="pendente" />
			<Etapa status="corrigido" />
		</div>
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
		margin-bottom: 12px;
	}

	.atividade-info > span {
		margin-left: auto;
		font-size: 1.2em;
	}

	.atividade-info > img {
		margin-left: 12px;
	}

	.column {
		margin-left: 24px;
		display: flex;
		flex-direction: column;
	}

	.etapas {
		display: flex;
		flex-direction: column;
	}

	.etapas-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
