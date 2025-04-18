<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import Button from '$lib/components/Button.svelte';
	import Page from '../atividades/+page.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	export let data;

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

	const dataAtual = new Date();
	const dataPublicacaoTeste = new Date();
	const dataComentarioPublicacaoTeste = new Date();

	dataPublicacaoTeste.setDate(dataAtual.getDate() - 5);
	dataComentarioPublicacaoTeste.setDate(dataAtual.getDate() - 2);

	const publicacoes = data.publicacoes;

	onMount(async () => {});
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-mural">
	<h1>Mural de publicações</h1>
	<div class="input-publicacao-container">
		<div class="input-icon">
			<CircularTextIcon size="70" backgroundColor="#{data.cor}">{data.nome[0]}</CircularTextIcon>
		</div>
		<div class="input-content">
			<InputTextArea
				placeholder="Escreva uma publicação para a sua turma..."
				borded
				fontSize="20px"
				width="600px"
			/>
			<div class="btn">
				<Button>Publicar</Button>
			</div>
		</div>
	</div>
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
						<p><b>{publicacao.autor}<b></b></b></p>
						<p class="data-publicacao">
							{publicacao.data_publicacao.toLocaleString('pt-BR', dateOptions)}
						</p>
					</div>
					<p class="conteudo-publicacao">{publicacao.conteudo}</p>
					<details class="comentario-details">
						<summary>Comentários ({publicacao.comentarios.length})</summary>
						{#each publicacao.comentarios as comentario}
							<div class="comentario-container">
								<div class="comentario-icon">
									<CircularIcon size="40" backgroundColor="#{comentario.cor}" />
								</div>

								<div class="comentario-content">
									<div class="row">
										<p><b>{comentario.nome}<b></b></b></p>
										<p class="data-comentario">
											{comentario.data_criacao.toLocaleString('pt-BR', dateOptions)}
										</p>
									</div>
									<p class="conteudo-comentario">{comentario.texto}</p>
								</div>
							</div>
						{/each}
					</details>
					<div class="input-comentario">
						<InputText
							fontSize="18px"
							borded
							backgroundColor="var(--cor-secundaria)"
							padding="8px"
						/>
						<Button height="40px" fontSize="18px">Comentar</Button>
					</div>
					<div class="anexos"></div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.content-mural {
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
		padding: 12px;
		display: flex;
		flex-direction: column;
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
		width: 100%;
	}

	.data-publicacao,
	.data-comentario {
		font-size: 16px;
		color: var(--cor-secundaria);
	}

	.conteudo-publicacao,
	.conteudo-comentario {
		width: 100%;
		padding-top: 4px;
		min-height: 40px;
		font-size: 18px;
	}

	.conteudo-comentario {
		min-height: 0px;
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
</style>
