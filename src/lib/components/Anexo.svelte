<script>
	export let arquivo = '';
	export let nomeArquivo = '';
	export let tipoDoArquivo = '';
</script>

<div class="anexo-container">
	<p class="tipo">{tipoDoArquivo}</p>
	<p class="nome">{nomeArquivo}</p>
</div>

<style scoped>
	.anexo-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: white;
		align-items: center;
		border-radius: 10px;
	}

	.tipo {
		padding: 14px 24px;
	}

	.nome {
		align-self: center;
		margin-left: 30px;
		font-size: 20px;
	}
</style>
