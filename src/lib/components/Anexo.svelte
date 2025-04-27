<script>
	export let arquivo = '';
	export let nomeArquivo = '';
	export let width = 'fit-content';
	export let height = '48px';
	export let fontSize = '20px';
	export let maxWidth = '400px';

	let tipoDoArquivo = nomeArquivo.split('.').pop().toLowerCase(); // Extrai a extensão do arquivo

	// Função para download de arquivos
	function downloadFile(buffer, filename, mimeType) {
		console.debug(`downloadFile(${buffer}, ${filename}, ${mimeType})`);
		if (!buffer) {
			console.error('Buffer inválido:', buffer);
			return;
		}

		// Se for o objeto { type: "Buffer", data: [...] }
		if (buffer.type === 'Buffer' && Array.isArray(buffer.data)) {
			buffer = new Uint8Array(buffer.data);
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

<button
	class="anexo-container"
	on:click={handleDownload}
	style="width: {width}; height: {height}; max-width: {maxWidth}"
>
	<p class="tipo">{tipoDoArquivo}</p>
	<p class="nome" style="font-size: {fontSize}">{nomeArquivo}</p>
</button>

<style scoped>
	.anexo-container {
		padding: 12px;
		display: flex;
		flex-direction: row;
		background-color: white;
		align-items: center;
		border-radius: 10px;
		cursor: pointer;
	}

	.nome {
		align-self: center;
		margin-left: 12px;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
