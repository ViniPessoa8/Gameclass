<script>
	export let nome;
	export let data_envio;
</script>

{#if data_envio}
	<div class="card">
		<p class="nome">{nome}</p>
		<p class="data">{data_envio}</p>
		<button class="botao">Visualizar</button>
	</div>
{:else}
	<div class="card off">
		<p class="nome">{nome}</p>
		<p class="sem-resposta">Aguardando Resposta</p>
	</div>
{/if}

<style>
	.card {
		display: flex;
		flex-direction: column;
		background-color: #0b2a71;
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
