<script>
	import { onMount } from 'svelte';
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Comentario from '$lib/components/Comentario.svelte';
	import Button from '$lib/components/Button.svelte';
	import Anexo from '$lib/components/Anexo.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { page } from '$app/stores';
	import { comentarios, fetchComentarios } from '$lib/../stores/listaComentarios.js';
	import { TIPO_ARQUIVO, TIPO_COMENTARIO } from '$lib/constants.js';

	export let data;

	const statusColor = 'blue';
	const iconColor = 'red';
	const descricaoEtapa =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus. Quisque mollis dui vel nisi commodo, nec aliquet ante tempor. Suspendisse at eros tristique, volutpat mi faucibus, viverra nibh. Nullam sagittis, sem in viverra blandit, nulla felis sollicitudin arcu, eu maximus ligula justo non tortor. Mauris sollicitudin scelerisque sapien tempor maximus. Sed in cursus magna. Suspendisse potenti. Nulla dolor nisl, tristique sit amet bibendum nec, auctor nec risus. Aenean tincidunt mi purus, at mollis quam faucibus in. Sed dictum erat arcu, vitae feugiat justo gravida ut.';
	const statusResposta = 'Concluída';

	let id;
	let idAtividade;
	let idEtapa;
	let textoComentario;
	let arquivos = [];
	let arquivo = 'teste';
	let listaComentarios;

	$: id = $page.params.id;
	$: idAtividade = $page.params.idAtividade;
	$: idEtapa = $page.params.idEtapa;
	$: arquivos = [...arquivos, arquivo];
	$: listaComentarios = comentarios;

	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timezone: 'America/Manaus'
	};

	async function adicionarComentario() {
		const idUsuario = data.usuario.id;
		const idEntrega = data.entrega.id;
		const dataAtual = new Date();
		const formatter = new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
		const dataFormatada = formatter.format(dataAtual);

		const comentario = {
			idUsuario: idUsuario,
			idEntrega: idEntrega,
			texto: textoComentario,
			data: dataFormatada,
			tipo: TIPO_COMENTARIO.entrega
		};

		const response = await fetch('/api/database/adicionarComentario', {
			method: 'POST',
			body: JSON.stringify({ comentario }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			fetchComentarios(idEntrega);
		}
	}

	onMount(async () => {
		await fetchComentarios(data.entrega.id);
		console.debug(comentarios);
	});
</script>

<div class="content-etapa">
	<div class="left-column">
		<div class="page-info-container">
			<h1>{data.etapa.titulo}</h1>
			<h3>{data.atividade.titulo}</h3>
		</div>
		<hr />
		<div class="descricao-etapa">{descricaoEtapa}</div>
		<hr />
		<div class="comentarios-etapa">
			<p style="font-size:22px">{$listaComentarios.length} Comentários</p>
			{#each $listaComentarios as comentario}
				<Comentario
					texto={comentario.texto}
					nome={comentario.nome}
					data={new Date(comentario.data_criacao).toLocaleString('pt-BR', dateOptions)}
				/>
			{/each}
		</div>
		<div class="comentario-input">
			<CircularIcon backgroundColor={iconColor} text="V" type="text" />
			<InputText bind:value={textoComentario} borded placeholder="Deixe um comentário" />
			<Button type="text" backgroundColor="var(--cor-secundaria)" on:click={adicionarComentario}
				>Enviar</Button
			>
		</div>
	</div>
	<div class="right-column">
		<h2>Estudante: {data.nomeEstudante}</h2>
		<div class="resposta-container">
			<div class="top-content">
				<div class="resposta-header">
					{#if data.usuario.perfil == 'estudante'}
						<p><b>Sua resposta</b></p>
					{:else if data.usuario.perfil == 'professor'}
						<p><b>Resposta</b></p>
					{/if}
					<p class="status-resposta">({statusResposta})</p>
				</div>
				<!-- TODO: icone do tipo de arquivo -->
				{#if arquivos && arquivos.length != 0}
					{#each arquivos as arquivo}
						{@const nomeDoArquivo = arquivo.split('/').at(-1).split('\\').at(-1).split('.')[0]}
						<Anexo {arquivo} tipoDoArquivo={TIPO_ARQUIVO.PDF} nomeArquivo={nomeDoArquivo} />
					{/each}
				{/if}
				{#if data.usuario.perfil == 'estudante'}
					<div class="btn-anexo">
						<label title="Anexar arquivo" for="inputFiles" class="btn">+</label>
						<input
							id="inputFiles"
							bind:value={arquivo}
							type="file"
							accept="image/*"
							style="display: none;"
						/>
					</div>
				{/if}
			</div>
			{#if data.usuario.perfil == 'estudante'}
				<div class="btn-cancelar">
					<Button backgroundColor="var(--cor-secundaria)" color="white" type="text" marginTop="auto"
						>Cancelar Envio</Button
					>
				</div>
			{/if}
		</div>
	</div>
</div>

<style scoped>
	.content-etapa {
		display: flex;
		padding-top: 64px;
		padding-left: 96px;
		padding-right: 96px;
	}

	.left-column,
	.right-column,
	.atividade-info-container {
		display: flex;
		flex-direction: column;
	}

	.left-column {
		padding: 12px;
		flex: 2;
	}

	.right-column {
		padding: 12px;
		flex: 1;
		text-align: center;
	}

	.right-column > h2 {
		margin-bottom: 12px;
	}

	.page-info-container {
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
		justify-content: space-between;
		align-items: center;
	}

	.titulo-atividade {
		font-size: 22px;
	}

	.realizacao-atividade {
		font-size: 16px;
		color: var(--cor-secundaria);
	}

	.descricao-etapa {
		min-height: 348px;
		font-size: 20px;
		color: var(--cor-secundaria);
	}

	.titulo-etapa {
		font-size: 20px;
		color: var(--cor-primaria);
	}

	.prazo-status-etapa {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.prazo-etapa {
		color: var(--cor-primaria);
		font-size: 16px;
	}

	.comentarios-etapa {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.comentario-input {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 24px;
		gap: 12px;
	}

	.resposta-container {
		width: 100%;
		height: 420px;
		background-color: var(--cor-primaria);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		padding: 14px;
		gap: 22px;
		align-items: center;
	}

	.resposta-header {
		font-size: 26px;
		color: white;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 24px;
	}

	.top-content {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.resposta-header > .status-resposta {
		color: var(--cor-secundaria);
	}

	.btn-anexo {
		align-self: center;
		margin-top: 12px;
		margin-bottom: 24px;
	}

	.btn-cancelar {
		justify-self: center;
		margin-top: auto;
		margin-bottom: 24px;
	}

	.btn {
		border: none;
		height: 48px;
		font-family: var(--font);
		font-weight: bold;
		color: var(--cor-primaria);
		background-color: var(--cor-secundaria);
		border-radius: 15px;
		padding: 10px 15px;
	}

	.btn:hover {
		background-color: #a1a1a1;
		transition: 0.3s;
		cursor: pointer;
	}
</style>
