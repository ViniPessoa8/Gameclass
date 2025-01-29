<script>
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Comentario from '$lib/components/Comentario.svelte';
	import { page } from '$app/stores';

	const statusColor = 'blue';
	const iconColor = 'red';
	const descricaoEtapa =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus. Quisque mollis dui vel nisi commodo, nec aliquet ante tempor. Suspendisse at eros tristique, volutpat mi faucibus, viverra nibh. Nullam sagittis, sem in viverra blandit, nulla felis sollicitudin arcu, eu maximus ligula justo non tortor. Mauris sollicitudin scelerisque sapien tempor maximus. Sed in cursus magna. Suspendisse potenti. Nulla dolor nisl, tristique sit amet bibendum nec, auctor nec risus. Aenean tincidunt mi purus, at mollis quam faucibus in. Sed dictum erat arcu, vitae feugiat justo gravida ut.';
	const comentarios = [
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

	let id, idAtividade, idEtapa;

	$: id = $page.params.id;
	$: idAtividade = $page.params.idAtividade;
	$: idEtapa = $page.params.idEtapa;
</script>

<div class="content-etapa">
	<div class="left-column">
		<div class="page-info-container">
			<div class="atividade-info-container">
				<p class="titulo-atividade"><b>Nome da Atividade</b></p>
				<p class="realizacao-atividade">realização</p>
			</div>
			<p><b>></b></p>
			<!-- <div class="etapa-info-container"> -->
			<!-- TODO: Fazer icone ter a mesma cor do icone da turma -->
			<CircularIcon backgroundColor={iconColor} text="t" type="text" />
			<p class="titulo-etapa"><b>Nome da Etapa</b></p>
			<div class="prazo-status-etapa">
				<p class="prazo-etapa">Prazo: xx/xx/xxxx</p>
				<p style="color: {statusColor}; font-size: 20px"><b>Status<b /></b></p>
			</div>
			<!-- </div> -->
		</div>
		<hr />
		<div class="descricao-etapa">{descricaoEtapa}</div>
		<hr />
		<div class="comentarios-etapa">
			<p style="font-size:22px">{comentarios.length} Comentários</p>
			<!-- TODO: Loop para mostrar componente Comentario.svelte -->
			{#each comentarios as comentario}
				<Comentario texto={comentario.texto} nome={comentario.nome} data={comentario.data} />
			{/each}
		</div>
	</div>
	<div class="right-column"></div>
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
		border: 1px solid red;
		padding: 12px;
		flex: 2;
	}

	.right-column {
		border: 1px solid red;
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
</style>
