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
	let status = itemAtividade.status;

	// calculated variables
	let dataAtual = new Date().getTime();
	let iconText = titulo[0].toUpperCase();

	const STATUS_ID = {
		0: 'pendente',
		1: 'agendado',
		2: 'lancado',
		3: 'aguardando_correcao',
		4: 'corrigido'
	};
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
			<h3 class="status-text-{STATUS_ID[status]}">
				{capitalizeFirstLetter(STATUS_ITEM_ATIVIDADE_PROFESSOR[status])}
			</h3>
			<h3 class="status-grade-{STATUS_ID[status]}">{notaMax}</h3>
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

	.status-text-pendente,
	.status-text-lancado,
	.status-text-agendado {
		color: var(--cor-secundaria);
	}

	/* 3. AGUARDANDO_CORRECAO */
	.status-text-aguardando_correcao {
		color: red;
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
</style>
