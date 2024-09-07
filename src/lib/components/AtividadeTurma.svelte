<script>
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import ButtonRedirect from './ButtonRedirect.svelte';
	import icon_atividade_turma from '$lib/assets/icon_atividade_turma.png';
	import icon_seta_cima from '$lib/assets/icon_seta_cima.png';
	import IconeInformacao from './IconeInformacao.svelte';

	const STATUS = {
		corrigido: 'corrigido',
		pendente: 'pendente',
		entregue: 'entregue'
	};
	export let status = STATUS.pendente;
	let width = 0;

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
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
			<div class="etapa">
				<CircularIcon backgroundColor="var(--cor-secundaria)" type="text" text="E1" />
				<div class="titulo-etapa">
					<h3>Titulo_da_etapa</h3>
					<IconeInformacao text="Título da etapa da atividade" alt="mais informações" />
				</div>
				<div class="column">
					<span>Prazo: 16/07/2023</span>
					<div class="status row">
						<h3 class="status-text-{status}">{capitalizeFirstLetter(status)}</h3>
						{#if status === STATUS.corrigido}
							<h3 class="status-grade-{status}">8.5</h3>
						{/if}
					</div>
				</div>
				<ButtonRedirect color="white">Visualizar</ButtonRedirect>
			</div>
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

	.etapa {
		margin-top: 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 80%;
	}

	.titulo-etapa {
		display: flex;
		flex-direction: row;
	}

	.titulo-etapa > h3 {
		margin-right: 8px;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-evenly;
	}

	.status-text-corrigido {
		color: var(--cor-secundaria-4);
	}

	.status-grade-corrigido {
		padding-left: 4px;
		padding-right: 4px;
		background-color: var(--cor-secundaria-4);
		border-radius: 10px;
	}

	.status-text-entregue {
		color: var(--cor-secundaria);
	}

	.status-text-pendente {
		color: var(--cor-secundaria-2);
	}
</style>
