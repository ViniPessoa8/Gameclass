<script>
	import ButtonRedirect from './ButtonRedirect.svelte';
	import IconeInformacao from './IconeInformacao.svelte';
	import CircularIcon from './CircularIcon.svelte';
	import { STATUS_ITEM_ATIVIDADE_PROFESSOR } from '$lib/constants.js';

	export let itemAtividade;
	let prazoFinalStr = itemAtividade.data_entrega_final
		.toLocaleString('pt-BR', { timeZone: 'UTC' })
		.slice(0, -3);

	function capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	// Props
	let titulo = itemAtividade.titulo;
	let notaMax = parseFloat(itemAtividade.nota_max).toFixed(1);
	let dataInicial = itemAtividade.data_entrega_inicial;
	let dataFinal = itemAtividade.data_entrega_final;

	// calculated variables
	let dataAtual = new Date().getTime();
	let iconText = titulo[0].toUpperCase();
	let dataInicialTime = dataInicial.getTime();
	let dataFinalTime = dataFinal.getTime();

	console.debug(dataAtual, dataInicial, dataFinal);

	let status;
	if (!dataInicialTime) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.pendente;
	} else if (dataAtual < dataInicialTime) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.agendado;
	} else if (dataAtual >= dataInicialTime && dataAtual <= dataFinalTime) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.lancado;
	} else if (dataAtual > dataFinalTime) {
		status = STATUS_ITEM_ATIVIDADE_PROFESSOR.aguardando_correcao;
	}
</script>

<div class="etapa">
	<CircularIcon backgroundColor="var(--cor-secundaria)" type="text" text={iconText} />
	<div class="titulo-etapa">
		<h3>{titulo}</h3>
		<IconeInformacao text="Título da etapa da atividade" alt="mais informações" />
	</div>
	<div class="column info">
		<span class="prazo">Prazo: {prazoFinalStr}</span>
		<div class="status row">
			<h3 class="status-text-{status.toLowerCase()}">
				{capitalizeFirstLetter(status)}
			</h3>
			{#if itemAtividade.status === STATUS_ITEM_ATIVIDADE_PROFESSOR.corrigido}
				<h3 class="status-grade-{status.toLowerCase()}">{notaMax}</h3>
			{/if}
		</div>
	</div>
	<ButtonRedirect color="white">Visualizar</ButtonRedirect>
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
		margin-left: 8px;
		word-wrap: break-word;
		display: inline-block;
		white-space: normal;
	}

	.column .info {
		width: 100%;
	}

	.row {
		width: 100%;
		display: flex;
		justify-content: end;
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

	.status-grade-pendente,
	.status-grade-agendado {
		margin-left: 8px;
		padding-left: 4px;
		padding-right: 4px;
		background-color: var(--cor-primaria);
		color: white;
		border-radius: 10px;
	}

	.status-text-entregue {
		color: var(--cor-secundaria);
	}

	.status-text-pendente,
	.status-text-agendado {
		color: var(--cor-secundaria-2);
	}
</style>
