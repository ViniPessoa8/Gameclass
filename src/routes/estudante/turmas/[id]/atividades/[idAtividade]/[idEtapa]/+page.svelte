<script>
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Comentario from '$lib/components/Comentario.svelte';
	import Button from '$lib/components/Button.svelte';
	import Anexo from '$lib/components/Anexo.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { TIPO_ARQUIVO } from '$lib/constants.js';
	import { page } from '$app/stores';

	export let data;

	const statusColor = 'blue';
	const iconColor = 'red';
	const descricaoEtapa =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus. Quisque mollis dui vel nisi commodo, nec aliquet ante tempor. Suspendisse at eros tristique, volutpat mi faucibus, viverra nibh. Nullam sagittis, sem in viverra blandit, nulla felis sollicitudin arcu, eu maximus ligula justo non tortor. Mauris sollicitudin scelerisque sapien tempor maximus. Sed in cursus magna. Suspendisse potenti. Nulla dolor nisl, tristique sit amet bibendum nec, auctor nec risus. Aenean tincidunt mi purus, at mollis quam faucibus in. Sed dictum erat arcu, vitae feugiat justo gravida ut.';
	let comentarios = [
		{
			nome: 'Vinícius Pessoa',
			texto:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus.',
			data: '06/12/1999'
		},
		{
			nome: 'Lorena Simpson',
			texto:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus.',
			data: '06/12/1999'
		}
	];
	const statusResposta = 'Concluída';

	let id;
	let idAtividade;
	let idEtapa;
	let textoComentario;
	let arquivos = [];
	let arquivo = 'teste';

	$: id = $page.params.id;
	$: idAtividade = $page.params.idAtividade;
	$: idEtapa = $page.params.idEtapa;
	$: arquivos = [...arquivos, arquivo];

	// Gambiarra pra mostrar a data no dia certo (diferença de timezone)
	const prazoEtapa = new Date(data.etapa.data_entrega_final.toISOString());
	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timezone: 'America/Manaus'
	};
	const dataFormatada = prazoEtapa.toLocaleString('pt-BR', dateOptions);

	function adicionarComentario() {
		const nomeUsuario = data.usuario.login;
		const dataAtual = new Date();
		const formatter = new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
		const dataFormatada = formatter.format(dataAtual);

		comentarios = [
			...comentarios,
			{
				nome: nomeUsuario,
				texto: textoComentario,
				data: dataFormatada
			}
		];
	}
</script>

<div class="content-etapa">
	<div class="left-column">
		<div class="page-info-container">
			<div class="atividade-info-container">
				<p class="titulo-atividade"><b>Nome da Atividade</b></p>
				<p class="realizacao-atividade">realização</p>
			</div>
			<p><b></b></p>
			<!-- TODO: Fazer icone ter a mesma cor do icone da turma -->
			<CircularIcon backgroundColor={iconColor} text="t" type="text" />
			<p class="titulo-etapa"><b>Nome da Etapa</b></p>
			<div class="prazo-status-etapa">
				<p class="prazo-etapa">Prazo: {dataFormatada}</p>
				<p style="color: {statusColor}; font-size: 20px"><b>Status<b /></b></p>
			</div>
		</div>
		<hr />
		<div class="descricao-etapa">{descricaoEtapa}</div>
		<hr />
		<div class="comentarios-etapa">
			<p style="font-size:22px">{comentarios.length} Comentários</p>
			{#each comentarios as comentario}
				<Comentario texto={comentario.texto} nome={comentario.nome} data={comentario.data} />
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
		padding-top: 126px;
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
	}

	.page-info-container {
		display: flex;
		flex-direction: row;
		padding-bottom: 8px;
	}

	.titulo-atividade {
		font-size: 22px;
	}

	.realizacao-atividade {
		font-size: 16px;
		color: var(--cor-secundaria);
	}

	.page-info-container {
		justify-content: space-between;
		align-items: center;
		/* gap: 12px; */
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
