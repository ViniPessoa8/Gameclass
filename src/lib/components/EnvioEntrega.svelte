<script>
	import { onMount } from 'svelte';
	import Entrega from '$lib/models/Entrega.js';

	export let dados;
	export let onClick;

	let corCard;

	onMount(() => {
		if (dados && dados.entrega && dados.entrega.avaliacao) {
			corCard = 'green';
		} else {
			corCard = '#0b2a71';
		}
	});
</script>

{#if dados}
	{#if dados.entrega}
		<div class="card" style="background-color: {corCard}">
			{#if dados.em_grupos}
				<p class="nome">{dados.grupo.nome}</p>
			{:else}
				<p class="nome">{dados.estudante.nome}</p>
			{/if}
			{#if dados.entrega.avaliacao}
				<p class="status">(corrigida)</p>
			{/if}
			<p class="data">{new Entrega(dados.entrega).formataDataEntrega()}</p>
			<button on:click={onClick} class="botao">Visualizar</button>
		</div>
	{:else if dados.estudante || dados.grupo}
		<div class="card off">
			{#if dados.grupo}
				<p class="nome">{dados.grupo.nome}</p>
				<p class="sem-resposta">Aguardando Resposta</p>
			{:else if dados.estudante}
				<p class="nome">{dados.estudante.nome}</p>
				<p class="sem-resposta">Aguardando Resposta</p>
			{/if}
		</div>
	{:else}
		<div class="card off">
			<p class="nome">Grupo ?</p>
			<p class="data">(Não Formado)</p>
		</div>
	{/if}
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
		min-height: 120px;
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
