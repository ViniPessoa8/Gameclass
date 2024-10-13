<script>
	import ButtonRedirect from './ButtonRedirect.svelte';
	import IconeInformacao from './IconeInformacao.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import { STATUS_ITEM_ATIVIDADE_PROFESSOR } from '$lib/constants.js';

	// TODO: get status dinamicamente
	export let itemAtividade;
	itemAtividade.data_entrega_final.toLocaleString('pt-BR', { timeZone: 'UTC' }).slice(0, -3);

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	let dataInicial = itemAtividade.data_entrega_inicial.getTime();
	let dataFinal = itemAtividade.data_entrega_final.getTime();
	console.debug(dataAtual, dataInicial, dataFinal);

	let status;
	if (!dataInicial) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.pendente;
	} else if (dataAtual < dataInicial) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.agendado;
	} else if (dataAtual >= dataInicial && dataAtual <= dataFinal) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.lancado;
	} else if (dataAtual > dataFinal) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.aguardando_correcao;
	}
</script>

<div class="etapa">
	<CircularIcon backgroundColor="var(--cor-secundaria)" type="text" text={itemAtividade.iconText} />
	<div class="titulo-etapa">
		<h3>{itemAtividade.titulo}</h3>
		<IconeInformacao text="Título da etapa da atividade" alt="mais informações" />
	</div>
	<div class="column">
		<span>Prazo: {itemAtividade.prazo}</span>
		<div class="status row">
			<h3 class="status-text-{itemAtividade.status}">
				{capitalizeFirstLetter(itemAtividade.status)}
			</h3>
			{#if itemAtividade.status === STATUS_ITEM_ATIVIDADE_PROFESSOR.corrigido}
				<h3 class="status-grade-{itemAtividade.status}">8.5</h3>
			{/if}
		</div>
	</div>
	<ButtonRedirect color="white">Visualizar</ButtonRedirect>
</div>

<style>
	.etapa {
		width: 100%;
		margin-top: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.titulo-etapa {
		width: 300px;
		display: flex;
	}

	.titulo-etapa > h3 {
		margin-right: 8px;
		word-wrap: break-word;
		display: inline-block;
		white-space: normal;
	}

	.column {
		width: 150px;
	}

	.row {
		display: flex;
		justify-content: start;
	}

	.status-text-corrigido {
		color: var(--cor-secundaria-4);
	}

	.status-grade-corrigido {
		margin-left: 8px;
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
