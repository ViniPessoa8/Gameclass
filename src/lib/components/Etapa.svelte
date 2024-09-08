<script>
	import ButtonRedirect from './ButtonRedirect.svelte';
	import IconeInformacao from './IconeInformacao.svelte';
	import CircularIcon from './CircularIcon.svelte';

	export let status = STATUS.pendente;

	const STATUS = {
		corrigido: 'corrigido',
		pendente: 'pendente',
		entregue: 'entregue'
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

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

<style>
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
