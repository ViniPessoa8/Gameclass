<script>
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import Button from '$lib/components/Button.svelte';
	import Anexo from '$lib/components/Anexo.svelte';
	import Page from '../atividades/+page.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	let textoPublicacao = $state('');
	let arquivos = $state([]);
	let { data } = $props();

	if (!$selectedTurmaTabBar) {
		$selectedTurmaTabBar = 0;
	}

	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timezone: 'America/Manaus'
	};

	let publicacoes = $derived(data.publicacoes);

	function validaFormPublicacao() {
		if (!textoPublicacao || textoPublicacao == '') {
			toast.error('Texto da publicação não pode ser vazio.');
			return false;
		}

		return true;
	}

	function handleArquivos(event) {
		arquivos = Array.from(event.target.files);
	}

	onMount(async () => {});
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-mural">
	<h1>Mural de publicações</h1>
	<form
		class="input-publicacao-container"
		method="post"
		action="?/novaPublicacao"
		enctype="multipart/form-data"
		use:enhance={(cancel) => {
			if (!validaFormPublicacao()) {
				cancel();
			}

			return async ({ result, update }) => {
				if (result.data) {
					await invalidate();
					arquivos = [];
					toast.success('Publicação criada com sucesso!');
				}
				await update();
			};
		}}
	>
		<div class="input-icon">
			<CircularTextIcon size="70" backgroundColor="#{data.cor}">{data.nome[0]}</CircularTextIcon>
		</div>
		<div class="input-content">
			<InputTextArea
				id="inputTextoPublicacao"
				name="textoPublicacao"
				placeholder="Escreva uma publicação para a sua turma..."
				borded
				fontSize="20px"
				width="600px"
				bind:value={textoPublicacao}
			/>
			<div class="row">
				<div class="input-anexos">
					{#each arquivos as arquivo}
						<Anexo arquivo nomeArquivo={arquivo.name} />
					{/each}
				</div>

				<div class="btn anexo-container">
					<label title="Anexar arquivo" for="inputFiles" class="btn-anexo">+</label>
					<input
						id="inputFiles"
						name="inputFiles"
						onchange={handleArquivos}
						accept="image/*, .pdf, .doc, .docx, .py, .c, cpp, .js, .html, .css"
						type="file"
						style="display: none;"
						multiple
					/>
				</div>
				<div class="btn">
					<Button type="submit">Publicar</Button>
				</div>
			</div>
		</div>
	</form>
	<div class="publicacoes-container">
		{#each publicacoes as publicacao}
			<div class="publicacao-container">
				<div class="publicacao-icon">
					<CircularTextIcon backgroundColor="#{publicacao.cor_autor}"
						>{publicacao.autor[0]}</CircularTextIcon
					>
				</div>

				<div class="publicacao-content">
					<div class="row">
						<p class="autor-publicacao" style:color="#{publicacao.cor_autor}">
							<b>{publicacao.autor}<b></b></b>
						</p>
						<p class="data-publicacao">
							{new Date(publicacao.data_publicacao).toLocaleString('pt-BR', dateOptions)}
						</p>
					</div>
					<div class="row">
						<p class="conteudo-publicacao">{publicacao.conteudo}</p>
					</div>
					<div class="input-anexos">
						{#each publicacao.anexos as anexo}
							<Anexo arquivo={anexo} nomeArquivo={anexo.titulo} />
						{/each}
					</div>
					<details class="comentario-details">
						<summary>Comentários ({publicacao.comentarios.length})</summary>
						{#each publicacao.comentarios as comentario}
							<div class="comentario-container">
								<div class="comentario-icon">
									<CircularTextIcon size="48" fontSize="25" backgroundColor="#{comentario.cor}">
										{comentario.nome[0]}
									</CircularTextIcon>
								</div>

								<div class="comentario-content">
									<div class="row">
										<p class="autor-comentario" style:color="#{comentario.cor}">
											<b>{comentario.nome}<b></b></b>
										</p>
										<p class="data-comentario">
											{new Date(comentario.data_criacao).toLocaleString('pt-BR', dateOptions)}
										</p>
									</div>
									<p class="conteudo-comentario">{comentario.texto}</p>
								</div>
							</div>
						{/each}
					</details>
					<form
						class="input-comentario"
						method="post"
						action="?/novoComentario"
						use:enhance={() => {
							return async ({ result, update }) => {
								if (result.type == 'failure') {
									toast.error(result.data);
								} else if (result.data) {
									await invalidate();
									toast.success('Comentário criado com sucesso');
								}
								await update();
							};
						}}
					>
						<input type="hidden" name="idPublicacao" value={publicacao.id} />
						<InputText
							id="inputTextoComentario"
							name="textoComentario"
							fontSize="18px"
							borded
							backgroundColor="var(--cor-secundaria)"
							padding="8px"
						/>
						<Button type="submit" height="40px" fontSize="18px">Comentar</Button>
					</form>
					<div class="anexos"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style scoped>
	.content-mural {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 24px;
		padding: 24px 128px;
	}

	.input-publicacao-container {
		display: flex;
		flex-direction: row;
		background-color: var(--cor-primaria);
		border-radius: 12px;
	}

	.input-icon {
		padding: 12px;
	}

	.input-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 12px;
		align-items: end;
	}

	.input-content .btn {
		padding: 8px;
	}

	.publicacoes-container {
		margin-top: 48px;
		display: flex;
		flex-direction: column;
		color: white;
		width: 100%;
		gap: 24px;
	}

	.publicacao-container,
	.comentario-container {
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		width: 100%;
		border-radius: 12px;
		background-color: var(--cor-primaria);
		padding: 12px 12px 12px 0px;
	}

	.publicacao-icon,
	.comentario-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		text-align: center;
		padding: 0px 12px 12px 12px;
	}

	.comentario-icon {
		padding: 4px 8px;
	}

	.publicacao-content,
	.comentario-content {
		word-wrap: break-word;
		overflow: hidden;
		box-sizing: border-box;
		width: 100%;
		text-wrap: pretty;
	}

	.data-publicacao,
	.data-comentario {
		font-size: 24px;
		color: var(--cor-secundaria);
	}

	.conteudo-publicacao {
		width: 100%;
		padding-top: 4px;
		min-height: 40px;
		font-size: 22px;
	}

	.conteudo-comentario {
		min-height: 0px;
		font-size: 20px;
	}

	.input-comentario {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: end;
		gap: 8px;
	}

	.comentario-details {
		padding: 8px 4px;
	}

	.comentario-details summary {
		color: darkgrey;
		cursor: pointer;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.btn {
		display: flex;
		align-items: center;
		width: fit-content;
	}

	.btn-anexo {
		border: none;
		align-self: center;
		font-family: var(--font);
		font-weight: bold;
		color: var(--cor-primaria);
		background-color: var(--cor-secundaria);
		border-radius: 15px;
		padding: 10px 15px;
		cursor: pointer;
	}

	.autor-publicacao {
		font-size: 22px;
	}

	.autor-comentario {
		font-size: 22px;
	}

	.input-anexos {
		max-width: 400px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 12px;
	}
</style>
