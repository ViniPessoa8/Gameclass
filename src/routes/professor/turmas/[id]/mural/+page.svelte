<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import InputTextArea from '$lib/components/InputTextArea.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Button from '$lib/components/Button.svelte';
	import Page from '../atividades/+page.svelte';

	export let data;

	const nomeUsuario = data.nomeUsuario;
	const corUsuario = data.corUsuario;

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
	const publicacoes = [
		{
			autor: 'Roberto Guedes',
			conteudo: 'Alguém sem grupo?',
			data: dataPublicacaoTeste.toLocaleString('pt-BR', dateOptions),
			comentarios: [
				{
					autor: 'Santa Monica',
					conteudo: 'Eu! :3',
					data: dataComentarioPublicacaoTeste.toLocaleString('pt-BR', dateOptions)
				}
			]
		}
	];

	onMount(async () => {});
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-mural">
	<h1>Mural de publicações</h1>
	<div class="input-publicacao-container">
		<div class="input-icon">
			<CircularIcon size="80" backgroundColor="red" />
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
					<CircularIcon backgroundColor="yellow" />
				</div>

				<div class="publicacao-content">
					<div class="row">
						<p><b>{publicacao.autor}<b></b></b></p>
						<p class="data-publicacao">{publicacao.data}</p>
					</div>
					<p class="conteudo-publicacao">{publicacao.conteudo}</p>
					<details class="comentario-details">
						<summary>Comentários ({publicacao.comentarios.length})</summary>
						{#each publicacao.comentarios as comentario}
							<div class="comentario-container">
								<div class="comentario-icon">
									<CircularIcon size="40" backgroundColor="yellow" />
								</div>

								<div class="comentario-content">
									<div class="row">
										<p><b>{comentario.autor}<b></b></b></p>
										<p class="data-comentario">{comentario.data}</p>
									</div>
									<p class="conteudo-comentario">{comentario.conteudo}</p>
								</div>
							</div>
						{/each}
					</details>
					<div class="input-comentario">
						<InputText fontSize="18px" borded backgroundColor="var(--cor-secundaria)" />
						<Button>Comentar</Button>
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
		color: white;
		width: 100%;
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
		padding: 12px;
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
		min-height: 80px;
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

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
