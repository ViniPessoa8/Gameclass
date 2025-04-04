<script>
	import { goto } from '$app/navigation';

	export let entrega;
	export let onClick;

	let corBotao, status;

	const formatter = new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	let corCard;
	console.debug(entrega.avaliada);
	if (entrega.avaliada) {
		corCard = 'green';
	} else {
		corCard = '#0b2a71';
	}
</script>

{#if entrega.data_entrega}
	<div class="card" style="background-color: {corCard}">
		<p class="nome">{entrega.nome}</p>
		<p class="data">{formatter.format(entrega.data_entrega)}</p>
		<button on:click={onClick} class="botao">Visualizar</button>
	</div>
{:else}
	<div class="card off">
		<p class="nome">{entrega.nome}</p>
		<p class="sem-resposta">Aguardando Resposta</p>
	</div>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		color: white;
		padding: 10px;
		border-radius: 10px;
		text-align: center;
		width: 150px;
	}

	.off {
		background-color: #505050;
	}

	.sem-resposta {
		font-size: 16px;
		font-weight: bold;
		color: var(--cor-secundaria-2);
		justify-self: end;
		align-self: flex-end;
		margin-top: auto;
	}

	.nome {
		font-size: 18px;
		font-weight: bold;
	}

	.data {
		font-size: 15px;
		margin: 5px 0;
		margin-top: auto;
	}

	.botao {
		background-color: #52a2ea;
		color: black;
		border: none;
		border-radius: 15px;
		padding: 5px 10px;
		cursor: pointer;
		font-size: 18px;
		font-weight: bold;
	}

	.botao:hover {
		background-color: #3b8cd4;
	}
</style>
