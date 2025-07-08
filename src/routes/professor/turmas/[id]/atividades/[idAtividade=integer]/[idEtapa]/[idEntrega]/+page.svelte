<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Comentario from '$lib/components/Comentario.svelte';
	import Button from '$lib/components/Button.svelte';
	import Anexo from '$lib/components/Anexo.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { comentarios, fetchComentarios } from '$lib/../stores/listaComentarios.js';
	import { TIPO_ARQUIVO, TIPO_COMENTARIO, STATUS_ENTREGA, AVALIACAO } from '$lib/constants.js';
	import { Toaster, toast } from 'svelte-sonner';

	export let data;

	const descricaoEtapa =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus. Quisque mollis dui vel nisi commodo, nec aliquet ante tempor. Suspendisse at eros tristique, volutpat mi faucibus, viverra nibh. Nullam sagittis, sem in viverra blandit, nulla felis sollicitudin arcu, eu maximus ligula justo non tortor. Mauris sollicitudin scelerisque sapien tempor maximus. Sed in cursus magna. Suspendisse potenti. Nulla dolor nisl, tristique sit amet bibendum nec, auctor nec risus. Aenean tincidunt mi purus, at mollis quam faucibus in. Sed dictum erat arcu, vitae feugiat justo gravida ut.';

	let id;
	let idAtividade;
	let idEtapa;
	let status, corStatus;
	let textoComentario;
	let arquivo;
	let listaComentarios;

	$: id = $page.params.id;
	$: idAtividade = $page.params.idAtividade;
	$: idEtapa = $page.params.idEtapa;
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

		const comentario = {
			idUsuario: idUsuario,
			idEntrega: idEntrega,
			texto: textoComentario,
			data: dataAtual,
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
			textoComentario = '';
		}
	}

	async function calculaStatusEntrega() {
		if (data.entrega.avaliada) {
			status = STATUS_ENTREGA['2'];
			corStatus = 'lightgreen';
		} else if (data.entrega.anexos.length > 0) {
			status = STATUS_ENTREGA['1'];
		} else {
			status = STATUS_ENTREGA['0'];
		}
	}

	onMount(async () => {
		await fetchComentarios(data.entrega.id);
		await calculaStatusEntrega();

		if (data.toast === 'avaliacao_atualizada') {
			toast.success('Avaliação editada com sucesso!');
			data.toast = '';
		}

		if (data.toast === 'avaliacao_realizada') {
			toast.success('Avaliação realizada com sucesso!');
			data.toast = '';
		}
	});
</script>

<Toaster richColors position="top-center" closeButton />

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
					cor={'#' + comentario.cor}
				/>
			{/each}
		</div>
		<div class="comentario-input">
			<CircularIcon backgroundColor={'#' + data.cor} text="V" type="text" />
			<InputText bind:value={textoComentario} borded placeholder="Deixe um comentário" />
			<Button type="text" backgroundColor="var(--cor-secundaria)" on:click={adicionarComentario}
				>Enviar</Button
			>
		</div>
	</div>
	<div class="right-column">
		{#if data.etapa.em_grupos}
			<h2>Grupo: {data.nome}</h2>
		{:else}
			<h2>Estudante: {data.nome}</h2>
		{/if}
		<div class="resposta-container">
			<div class="top-content">
				<div class="resposta-header">
					{#if data.usuario.perfil == 'estudante'}
						<p><b>Sua resposta</b></p>
					{:else if data.usuario.perfil == 'professor'}
						<p><b>Resposta</b></p>
					{/if}
					<p class="status-resposta" style="color:{corStatus}">({status})</p>
				</div>
				{#if data.entrega.anexos && data.entrega.anexos.length != 0}
					{#each data.entrega.anexos as arquivo}
						<Anexo
							fontSize="20px"
							width="100%"
							{arquivo}
							tipoDoArquivo={TIPO_ARQUIVO.PDF}
							nomeArquivo={arquivo.titulo}
						/>
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
			{#if status != 'Sem Resposta'}
				<div class="btn-avaliar">
					<Button
						backgroundColor="var(--cor-secundaria)"
						color="white"
						type="text"
						marginTop="auto"
						on:click={() => {
							if (data.etapa.tipo_avaliacao_nota == AVALIACAO.individual) {
								goto($page.url.pathname + '/escolhaIntegrante');
							} else {
								goto($page.url.pathname + '/avaliacao');
							}
						}}
					>
						{#if status == 'Corrigido'}
							Editar Avaliação
						{:else if status == 'Aguardando Correção'}
							Avaliar
						{/if}
					</Button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style scoped>
	.content-etapa {
		width: 100%;
		display: flex;
		padding-top: 64px;
	}

	.left-column,
	.right-column {
		display: flex;
		flex-direction: column;
		padding-left: 48px;
		padding-right: 12px;
	}

	.left-column {
		flex: 2;
	}

	.right-column {
		padding-right: 64px;
		flex: 1;
		text-align: center;
	}

	.right-column > h2 {
		margin-bottom: 12px;
	}

	.page-info-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
		justify-content: space-between;
		align-items: center;
	}

	.descricao-etapa {
		min-height: 348px;
		font-size: 20px;
		color: var(--cor-secundaria);
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

	.btn-avaliar {
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
