<script>
	export let arquivo = '';
	export let nomeArquivo = '';

	let tipoDoArquivo = nomeArquivo.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo

	// Função para download de arquivos
	function downloadFile(buffer, filename, mimeType) {
		console.debug(`downloadFile(${buffer}, ${filename}, ${mimeType})`);
		if (
			!buffer ||
			(!(typeof buffer === 'string') &&
				!(buffer instanceof Uint8Array) &&
				!(buffer instanceof ArrayBuffer))
		) {
			console.error('Buffer inválido:', buffer);
			return;
		}

		// Se o buffer for um ArrayBuffer, converte para Uint8Array
		if (buffer instanceof ArrayBuffer) {
			buffer = new Uint8Array(buffer);
		}

		const blob = new Blob([buffer], { type: mimeType });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();

		// Limpeza
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	// Função para determinar o tipo MIME com base na extensão do arquivo
	function getMimeTypeFromExtension(filename) {
		const extension = filename.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo

		switch (extension) {
			case 'txt':
				return 'text/plain';
			case 'pdf':
				return 'application/pdf';
			case 'jpg':
			case 'jpeg':
				return 'image/jpeg';
			case 'png':
				return 'image/png';
			case 'gif':
				return 'image/gif';
			case 'bmp':
				return 'image/bmp';
			default:
				return 'application/octet-stream'; // Tipo genérico para arquivos binários
		}
	}

	// Manipulador do evento de clique
	function handleDownload() {
		// Determinar o tipo MIME com base na extensão do arquivo
		const mimeType = getMimeTypeFromExtension(nomeArquivo);

		// Realizar o download do arquivo com base no tipo
		console.debug(arquivo);
		if (arquivo.conteudo_texto != null) {
			downloadFile(arquivo.conteudo_texto, nomeArquivo, mimeType);
		} else if (arquivo.conteudo_binario != null) {
			downloadFile(arquivo.conteudo_binario, nomeArquivo, mimeType);
		}
	}
</script>

<button class="anexo-container" on:click={handleDownload}>
	<p class="tipo">{tipoDoArquivo}</p>
	<p class="nome">{nomeArquivo}</p>
</button>

<style scoped>
	.anexo-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: white;
		align-items: center;
		border-radius: 10px;
		cursor: pointer;
	}

	.tipo {
		padding: 14px 24px;
	}

	.nome {
		align-self: center;
		margin-left: 12px;
		font-size: 20px;
		text-wrap: nowrap;
		text-overflow: ellipsis;
	}
</style>

