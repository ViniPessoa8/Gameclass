<script>
	import FlexibleProgressBar from './FlexibleProgressBar.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import Button from './Button.svelte';
	import icon_atividade_turma from '$lib/assets/icon_atividade_turma.png';
	import icon_seta_cima from '$lib/assets/icon_seta_cima.png';
	import icon_seta_baixo from '$lib/assets/icon_seta_baixo.png';
	import EtapaSubMenu from './EtapaSubMenu.svelte';
	import { goto } from '$app/navigation';
	import Atividade from '$lib/models/Atividade.js';
	import { ArchiveIcon, EditIcon } from 'svelte-feather-icons';
	import ButtonRedirect from './ButtonRedirect.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let { atividade, idTurma, maxEtapas } = $props();
	let showModal = $state(false);
	let atividadeParaArquivar = $state();
	let width = $state(0);
	let toggled = $state(false);

	const prazoFinalStr = new Atividade(atividade).formataPrazo();
	const segments = [];

	let btnTitle;
	if (atividade.itens_atividade.length >= maxEtapas) {
		btnTitle = `Número máximo de etapas atingido (${maxEtapas})`;
	} else if (atividade.prazo < Date.now()) {
		btnTitle = `Prazo da atividade já passou`;
	} else {
		btnTitle = `Adicionar Etapa`;
	}

	const total_etapas_concluidas = atividade.itens_atividade.filter(
		(i) => i.data_entrega_final <= Date.now() && i.avaliacoesPendentes == 0
	).length;
	if (total_etapas_concluidas > 0) {
		segments.push({
			name: 'etapas_concluidas',
			descricao: 'Etapas finalizadas',
			backgroundColor: 'var(--cor-secundaria-4)',
			color: 'black',
			value: total_etapas_concluidas
		});
	}

	const total_etapas_pendentes = atividade.itens_atividade.filter(
		(i) => i.avaliacoesPendentes > 0
	).length;
	if (total_etapas_pendentes > 0) {
		segments.push({
			name: 'etapas_pendentes',
			descricao: 'Etapas com avaliações pendentes',
			backgroundColor: 'var(--cor-secundaria-2)',
			color: 'black',
			value: total_etapas_pendentes
		});
	}

	const total_etapas_abertas = atividade.itens_atividade.filter(
		(i) =>
			i.data_entrega_inicial <= Date.now() &&
			i.data_entrega_final >= Date.now() &&
			i.avaliacoesPendentes == 0
	).length;
	if (total_etapas_abertas > 0) {
		segments.push({
			name: 'etapas_abertas',
			descricao: 'Etapas abertas para envio',
			backgroundColor: 'var(--cor-primaria)',
			color: 'white',
			value: total_etapas_abertas
		});
	}

	const total_etapas_a_lancar = atividade.itens_atividade.filter(
		(i) => i.data_entrega_inicial >= Date.now()
	).length;
	if (total_etapas_a_lancar > 0) {
		segments.push({
			name: 'etapas_a_lancar',
			descricao: 'Etapas agendadas para o futuro',
			backgroundColor: 'var(--cor-secundaria)',
			color: 'black',
			value: total_etapas_a_lancar
		});
	}

	if (segments.length == 0) {
		segments.push({
			name: 'sem_etapas',
			descricao: 'Não há etapas cadastradas',
			backgroundColor: 'var(--cor-secundaria-1)',
			color: 'black',
			value: 0
		});
	}

	function comparaItemAtividade(a, b) {
		return a.id - b.id;
	}

	function handleArquivaAtividade(item) {
		showModal = true;
		atividadeParaArquivar = item;
	}

	async function confirmaModalArquivarItemAtividade() {
		console.log('Arquiva item atividade ' + atividadeParaArquivar);
		try {
			const response = await fetch(`/api/atividade/${atividadeParaArquivar}/arquivar`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
				throw new Error(errorData.message || `Erro ${response.status}: Falha ao arquivar o item.`);
			}
		} catch (error) {
			console.error('Erro ao arquivar atividade:', error);
		}

		window.location.reload();
		showModal = false;
	}
</script>

<Modal
	visible={showModal}
	title="Atenção"
	message="Deseja realmente arquivar o item?"
	buttons={[
		{
			label: 'Sim',
			onClick: async () => {
				await confirmaModalArquivarItemAtividade();
			},
			color: 'green'
		},
		{
			label: 'Não',
			onClick: () => {
				showModal = false;
			},
			color: 'red'
		}
	]}
/>
<div
	class={toggled ? 'atividade-container-toggled' : 'atividade-container'}
	bind:clientWidth={width}
>
	<div
		class="atividade-info"
		aria-hidden="true"
		onclick={() => {
			toggled = toggled ? false : true;
		}}
	>
		<div class="atividade-info-barra">
			<FlexibleProgressBar {segments} />
		</div>
		<div class="atividade-info-content">
			<CircularIcon src={icon_atividade_turma} alt="Ícone de atividades da turma" />
			<div class="column">
				<h2 class="titulo">{atividade.titulo}</h2>
			</div>
			<div class="column right">
				<span>Prazo: {prazoFinalStr}</span>
				<div class="botoes">
					{#if toggled}
						<ButtonRedirect
							title="Editar Atividade"
							href="atividades/{atividade.id}/edit"
							color="white"><EditIcon size="24" /></ButtonRedirect
						>
						<Button
							title="Arquivar Atividade"
							backgroundColor="var(--cor-secundaria)"
							on:click={() => handleArquivaAtividade(atividade.id)}
							color="white"
							placeholder="Arquivar atividade"><ArchiveIcon size="24" /></Button
						>
					{/if}
				</div>
			</div>
			{#if toggled}
				<img src={icon_seta_cima} alt="Seta para abrir a turma" />
			{:else}
				<img src={icon_seta_baixo} alt="Seta para fechar a turma" />
			{/if}
		</div>
	</div>
	{#if toggled}
		<div class="etapas">
			<h2>Etapas</h2>
			{#if atividade.itens_atividade.length === 0}
				<h3 style="align-self: center; margin: 8px;">(Não há etapas nessa atividade)</h3>
			{/if}
			{#each atividade.itens_atividade.sort(comparaItemAtividade) as itemAtividade}
				<hr />
				<div class="etapas-container">
					<EtapaSubMenu {itemAtividade} {idTurma} idAtividade={atividade.id} />
				</div>
			{/each}
			<div class="button">
				<Button
					on:click={() => {
						// TODO: Get id disponivel para etapa
						goto(`atividades/create/etapas/?idAtividade=${atividade.id}`); // TODO: utilziar id dinamico da turma e da etapa
					}}
					color="white"
					backgroundColor="var(--cor-primaria)"
					marginTop="24px"
					disabled={atividade.itens_atividade.length >= maxEtapas || atividade.prazo < Date.now()}
					title={btnTitle}
					fontSize="16px">+ Adicionar Etapa</Button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.atividade-container {
		width: 70%;
		margin-bottom: 24px;
	}

	.atividade-container-toggled {
		width: 70%;
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

	.botoes {
		display: flex;
		flex-direction: row;
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
	}

	.atividade-info-content > img {
		margin-left: 12px;
	}

	.titulo {
		max-width: 500px;
	}

	.column {
		margin-left: 24px;
		display: flex;
		flex-direction: column;
	}

	.right {
		margin-left: auto;
		font-size: 1.2em;
	}

	.botoes {
		display: flex;
		gap: 4px;
		margin-top: 8px;
		justify-content: center;
	}

	.etapas {
		display: flex;
		flex-direction: column;
		margin-bottom: 12px;
	}

	.etapas-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-self: center;
		align-items: center;
	}
</style>
