<script>
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import Button from './Button.svelte';
	import icon_atividade_turma from '$lib/assets/icon_atividade_turma.png';
	import icon_seta_cima from '$lib/assets/icon_seta_cima.png';
	import icon_seta_baixo from '$lib/assets/icon_seta_baixo.png';
	import EtapaSubMenu from './EtapaSubMenu.svelte';
	import { goto } from '$app/navigation';
	import { STATUS_ITEM_ATIVIDADE_PROFESSOR } from '../constants';

	export let atividade;
	export let idTurma;
	let width = 0;
	let toggled = false;

	const prazoEtapa = new Date(atividade.prazo.toISOString());
	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timezone: 'America/Manaus'
	};
	const prazoFinalStr = prazoEtapa.toLocaleString('pt-BR', dateOptions);
</script>

<div
	class={toggled ? 'atividade-container-toggled' : 'atividade-container'}
	bind:clientWidth={width}
>
	<div
		class="atividade-info"
		aria-hidden="true"
		on:click={() => {
			toggled = toggled ? false : true;
		}}
	>
		<div class="atividade-info-barra">
			<BarraDeProgresso {width} />
		</div>
		<div class="atividade-info-content">
			<CircularIcon src={icon_atividade_turma} alt="Ícone de atividades da turma" />
			<div class="column">
				<h2>{atividade.titulo}</h2>
			</div>
			<span>Prazo: {prazoFinalStr}</span>
			{#if toggled}
				<img src={icon_seta_cima} alt="Seta para abrir a turma" />
			{:else}
				<img src={icon_seta_baixo} alt="Seta para fechar a turma" />
			{/if}
		</div>
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
					<EtapaSubMenu {itemAtividade} {idTurma} idAtividade={atividade.id} />
				</div>
			{/each}
			<!-- TODO: Toggle Button para abrir as etapas -->
			<div class="button">
				<Button
					on:click={() => {
						// TODO: Get id disponivel para etapa
						goto(`atividades/create/etapas/${atividade.id}/`); // TODO: utilziar id dinamico da turma e da etapa
					}}
					color="white"
					backgroundColor="var(--cor-primaria)"
					marginTop="24px"
					fontSize="16px">+ Adicionar Etapa</Button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.atividade-container {
		width: 50%;
		margin-bottom: 24px;
	}

	.atividade-container-toggled {
		width: 50%;
		margin-bottom: 24px;
		padding: 8px;
		border: 2px solid var(--input-border);
		border-radius: 8px;
	}

	.atividade-info {
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}

	.atividade-info-barra {
		display: flex;
		flex-direction: row;
		width: 100%;
	}

	.atividade-info-content {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		margin-bottom: 12px;
	}

	.button {
		align-self: center;
	}

	/* button { */
	/* 	background: none; */
	/* 	color: inherit; */
	/* 	border: none; */
	/* 	padding: 0; */
	/* 	font: inherit; */
	/* 	cursor: pointer; */
	/* 	outline: inherit; */
	/* } */

	.atividade-info-content > span {
		margin-left: auto;
		font-size: 1.2em;
	}

	.atividade-info-content > img {
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
		margin-bottom: 12px;
	}

	.etapas-container {
		width: 90%;
		display: flex;
		flex-direction: column;
		align-self: center;
		align-items: center;
	}
</style>
