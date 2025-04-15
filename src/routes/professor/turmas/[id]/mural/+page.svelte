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

	const publicacoes = [
		{
			autor: 'Roberto Guedes',
			conteudo: 'Alguém sem grupo?',
			data: new Date()
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
			<InputTextArea borded width="600px" />
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
					<p>{publicacao.autor}</p>
				</div>

				<div class="publicacao-content">
					<p class="data-publicacao">{publicacao.data}</p>
					<p class="conteudo-publicacao">{publicacao.conteudo}</p>
					<div class="input-comentario">
						<InputText borded backgroundColor="var(--cor-secundaria)" />
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

	.publicacao-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		border-radius: 12px;
		background-color: var(--cor-primaria);
		padding: 12px 12px 12px 0px;
	}

	.publicacao-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 12px;
	}

	.publicacao-icon p {
		padding-top: 4px;
	}

	.publicacao-content {
		width: 100%;
	}

	.data-publicacao {
		font-size: 14px;
		color: var(--cor-secundaria);
	}

	.conteudo-publicacao {
		width: 100%;
		padding-top: 4px;
		min-height: 80px;
	}

	.input-comentario {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: end;
		gap: 8px;
	}
</style>
