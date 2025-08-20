<script>
	import ButtonRedirect from './ButtonRedirect.svelte';
	import Button from './Button.svelte';
	import IconeInformacao from './IconeInformacao.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import ItemAtividade from '$lib/models/ItemAtividade.js';
	import { page } from '$app/state';
	import { STATUS_ITEM_ATIVIDADE } from '../constants';
	import { ArchiveIcon, EditIcon, EyeIcon } from 'svelte-feather-icons';
	import Modal from '$lib/components/Modal.svelte';

	let { itemAtividade, idAtividade } = $props();
	let showModal = $state(false);
	let itemParaArquivar = $state();

	itemAtividade = new ItemAtividade(itemAtividade);

	// Props
	let titulo = itemAtividade.titulo;
	let status = itemAtividade.status;

	// calculated variables
	let iconText = titulo[0].toUpperCase();

	const STATUS_ID = {
		0: 'pendente',
		1: 'agendado',
		2: 'lancado',
		3: 'aguardando_correcao',
		4: 'corrigido'
	};

	async function confirmaModalArquivarItemAtividade() {
		console.debug('Arquiva item atividade ' + itemParaArquivar);
		try {
			const response = await fetch(`/api/item_atividade/${itemParaArquivar}/arquivar`, {
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

	function handleArquivaItemAtividade(item) {
		showModal = true;
		itemParaArquivar = item;
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
<div class="etapa">
	<CircularIcon backgroundColor="var(--cor-secundaria)" type="text" text={iconText} />
	<div class="titulo-etapa">
		<h3>{titulo}</h3>
		<IconeInformacao text="Título da etapa da atividade" alt="mais informações" />
	</div>
	<div class="column info">
		<span class="prazo">Prazo: {itemAtividade.formataDataFinal()}</span>
		<div class="status row">
			<h3 class="status-text-{STATUS_ID[status]}">
				{#if page.url.pathname.includes('professor')}
					{STATUS_ITEM_ATIVIDADE.professor[status]}
				{:else}
					{STATUS_ITEM_ATIVIDADE.estudante[status]}
				{/if}
			</h3>
		</div>
	</div>
	<div class="botoes">
		<ButtonRedirect href="atividades/{idAtividade}/{itemAtividade.id}" color="white"
			><EyeIcon size="24" /></ButtonRedirect
		>
		<ButtonRedirect href="atividades/{idAtividade}/{itemAtividade.id}/edit" color="white"
			><EditIcon size="24" /></ButtonRedirect
		>
		<Button
			backgroundColor="var(--cor-secundaria)"
			on:click={() => handleArquivaItemAtividade(itemAtividade.id)}
			color="white"><ArchiveIcon size="24" /></Button
		>
	</div>
</div>

<style>
	.info {
		margin-right: 8px;
		text-align: end;
		width: 100%;
	}

	.etapa {
		width: 100%;
		margin-top: 12px;
		margin-bottom: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.titulo-etapa {
		width: 50em;
		display: flex;
	}

	.titulo-etapa > h3 {
		margin-right: 8px;
		margin-left: 8px;
		word-wrap: break-word;
		display: inline-block;
		white-space: normal;
	}

	.column .info {
		width: 100%;
	}

	.row {
		align-items: center;
		width: 100%;
		display: flex;
		justify-content: end;
	}

	/* 	0. PENDENTE */
	/* 1. AGENDADO */
	/* 2. LANCADO */
	.status-grade-pendente,
	.status-grade-lancado,
	.status-grade-agendado {
		margin-left: 8px;
		padding-left: 4px;
		padding-right: 4px;
		background-color: var(--cor-secundaria);
		/* color: black; */
		border-radius: 10px;
	}

	.status-text-agendado {
		color: var(--cor-secundaria);
	}

	.status-text-pendente,
	.status-text-lancado {
		color: var(--cor-primaria);
	}

	/* 3. AGUARDANDO_CORRECAO */
	.status-text-aguardando_correcao {
		color: var(--cor-secundaria-2);
	}

	.status-grade-aguardando_correcao {
		margin-left: 8px;
		padding-left: 4px;
		padding-right: 4px;
		background-color: var(--cor-secundaria);
		border-radius: 10px;
	}

	/* 4. CORRIGIDO */
	.status-text-corrigido {
		color: green;
	}

	.status-grade-corrigido {
		margin-left: 8px;
		padding-left: 4px;
		padding-right: 4px;
		background-color: var(--cor-secundaria);
		border-radius: 10px;
	}

	.botoes {
		display: flex;
		flex-direction: row;
		gap: 4px;
	}
</style>
