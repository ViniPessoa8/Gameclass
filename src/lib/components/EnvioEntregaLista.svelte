<script>
	import { onMount } from 'svelte';
	import Entrega from '$lib/models/Entrega.js';

	export let dados;
	export let receberAposPrazo;
	export let onClick;

	let corCard;

	onMount(() => {
		if (dados && dados.entrega && dados.entrega.avaliacao) {
			corCard = 'green';
		} else if (dados && !dados.entrega && dados.prazo < new Date()) {
			corCard = 'var(--cor-secundaria-2)';
		} else {
			corCard = 'var(--cor-primaria)';
		}
	});
</script>

{#if dados}
	{#if dados.entrega}
		<div class="item" style="background-color: {corCard}">
			{#if dados.em_grupos}
				<p class="nome">{dados.grupo.nome}</p>
			{:else}
				<p class="nome">{dados.estudante.nome}</p>
			{/if}

			{#if dados.entrega.avaliacao}
				<p class="status">Avaliado</p>
			{:else}
				<p class="avaliacao-pendente"><b>Avaliação Pendente</b></p>
			{/if}

			<p class="data">{new Entrega(dados.entrega).formataDataEntrega()}</p>
			<button on:click={onClick} class="botao">Visualizar</button>
		</div>
	{:else if dados.estudante || dados.grupo}
		<div class="item off">
			{#if dados.grupo}
				<p class="nome">{dados.grupo.nome}</p>
			{:else if dados.estudante}
				<p class="nome">{dados.estudante.nome}</p>
			{/if}

			{#if dados.prazo < new Date()}
				{#if receberAposPrazo}
					<p class="atrasado">Atrasado</p>
				{:else}
					<p class="atrasado">Perdido</p>
				{/if}
			{/if}

			<p class="sem-resposta">Aguardando Resposta</p>
			<p>-</p>
			<p></p>
		</div>
	{:else}
		<div class="item off">
			<p class="nome">Grupo ?</p>
			<p class="data">(Não Formado)</p>
		</div>
	{/if}
{/if}

<style>
	.item {
		display: grid;
		grid-template-columns: 250px 250px 250px 250px;
		flex-direction: row;
		color: white;
		padding: 10px;
		border-radius: 4px;
		text-align: center;
		align-items: center;
		justify-content: space-around;
	}

	.item > p {
		text-align: left;
	}

	.off {
		background-color: #505050;
	}

	.sem-resposta {
		font-size: 16px;
		color: var(--cor-secundaria-1);
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
		width: 140px;
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

	.atrasado {
		font-weight: 900;
		color: var(--cor-secundaria-3);
	}

	.avaliacao-pendente {
		font-weight: 500;
		color: var(--cor-secundaria-2);
	}
</style>
