<script>
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import icon_atividade_turma from '$lib/assets/icon_atividade_turma.png';
	import icon_seta_cima from '$lib/assets/icon_seta_cima.png';
	import icon_seta_baixo from '$lib/assets/icon_seta_baixo.png';
	import Etapa from './Etapa.svelte';

	export let atividade;
	console.log('ATIVIDADE: ', atividade);
	let width = 0;
	let toggled = false;
</script>

<!-- TODO: Toggle Button para abrir as etapas -->
<div class="atividade-container" bind:clientWidth={width}>
	<BarraDeProgresso {width} />
	<div
		class="atividade-info"
		aria-hidden="true"
		on:click={() => {
			toggled = toggled ? false : true;
		}}
	>
		<CircularIcon src={icon_atividade_turma} alt="Ícone de atividades da turma" />
		<div class="column">
			<h2>{atividade.titulo}</h2>
		</div>
		<span>Prazo: {atividade.prazo.toLocaleString('pt-BR', { timeZone: 'UTC' }).slice(0, -3)}</span>
		{#if toggled}
			<img src={icon_seta_cima} alt="Seta para abrir a turma" />
		{:else}
			<img src={icon_seta_baixo} alt="Seta para fechar a turma" />
		{/if}
	</div>
	<!-- TODO: Etapas as component (parameter: list of etapas)-->
	{#if toggled}
		<div class="etapas">
			<h2>Etapas</h2>
			{#if atividade.itens_atividade.length === 0}
				<h3 style="align-self: center; margin: 8px;">(Não há etapas nessa atividade)</h3>
			{/if}
			{#each atividade.itens_atividade as itemAtividade}
				<hr />
				<div class="etapas-container">
					<Etapa
						titulo={itemAtividade.titulo}
						status="Lançado"
						iconText="E1"
						prazo={itemAtividade.data_entrega_final
							.toLocaleString('pt-BR', { timeZone: 'UTC' })
							.slice(0, -3)}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.atividade-container {
		width: 50%;
		margin-bottom: 24px;
	}

	.atividade-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		margin-bottom: 12px;
		cursor: pointer;
	}

	button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
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
		width: 90%;
		display: flex;
		flex-direction: column;
		align-self: center;
		align-items: center;
	}
</style>
