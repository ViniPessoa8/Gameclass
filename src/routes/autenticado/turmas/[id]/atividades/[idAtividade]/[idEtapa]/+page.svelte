<script>
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import { page } from '$app/stores';
	import Page from '../../+page.svelte';

	const statusColor = 'blue';
	const iconColor = 'red';

	let id, idAtividade, idEtapa;

	$: id = $page.params.id;
	$: idAtividade = $page.params.idAtividade;
	$: idEtapa = $page.params.idEtapa;
</script>

<div class="content">
	<div class="left-column">
		<div class="page-info-container">
			<div class="atividade-info-container">
				<p class="titulo-atividade"><b>Nome da Atividade</b></p>
				<p style="color: var(--cor-secundaria);">realização</p>
			</div>
			<p><b>></b></p>
			<!-- <div class="etapa-info-container"> -->
			<!-- TODO: Fazer icone ter a mesma cor do icone da turma -->
			<CircularIcon backgroundColor={iconColor} text="t" type="text" />
			<p>Nome da Etapa</p>
			<div style="display: flex; flex-direction: column; align-items: center;">
				<p>Prazo: xx/xx/xxxx</p>
				<p style="color: {statusColor}"><b>Status<b /></b></p>
			</div>
			<!-- </div> -->
		</div>
		<hr />
		<div class="descricao-etapa"></div>
		<div class="comentarios-etapa">
			<p># Comentários</p>
			<!-- TODO: Loop para mostrar componente Comentario.svelte -->
		</div>
	</div>
	<div class="right-column"></div>
</div>

<style scoped>
	.content {
		display: flex;
		margin-top: 126px;
		margin-left: 96px;
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

	.page-info-container,
	.etapa-info-container {
		display: flex;
		flex-direction: row;
	}

	.etapa-info-container {
		gap: 15px;
		align-items: center;
	}

	.titulo-atividade {
		font-size: 1.5rem;
	}

	.page-info-container {
		justify-content: space-between;
		align-items: center;
		/* gap: 12px; */
	}

	.descricao-etapa {
		min-height: 348px;
	}
</style>
