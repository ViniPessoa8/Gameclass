<script>
	import { onMount } from 'svelte';
	import Entrega from '$lib/models/Entrega.js';

	let { dados, receberAposPrazo, onClick } = $props();

	let corCard = $state();

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
		<div class="card" style="background-color: {corCard}">
			{#if dados.em_grupos}
				<p class="nome">{dados.grupo.nome}</p>
			{:else}
				<p class="nome">{dados.estudante.nome}</p>
			{/if}

			{#if dados.entrega.avaliacao}
				<p>Avaliado</p>
			{:else}
				<p class="avaliacao-pendente">Avaliação Pendente</p>
			{/if}

			<p class="data">{new Entrega(dados.entrega).formataDataEntrega()}</p>
			<button onclick={onClick} class="botao">Visualizar</button>
		</div>
	{:else if dados.estudante || dados.grupo}
		<div class="card off">
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

	.atrasado {
		font-weight: 900;
		color: var(--cor-secundaria-3);
	}

	.avaliacao-pendente {
		font-weight: 500;
		color: var(--cor-secundaria-2);
	}
</style>
