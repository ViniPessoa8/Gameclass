<script>
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Comentario from '$lib/components/Comentario.svelte';
	import Button from '$lib/components/Button.svelte';
	import Anexo from '$lib/components/Anexo.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { TIPO_ARQUIVO } from '$lib/constants.js';
	import AtividadeInfo from '$lib/components/AtividadeInfo.svelte';
	import { page } from '$app/stores';
	import EnvioEstudante from '$lib/components/EnvioEstudante.svelte';
	import { goto } from '$app/navigation';

	export let data;

	let id;
	let idAtividade;
	let idEtapa;
	let arquivos = [];
	let arquivo = 'teste';

	$: id = $page.params.id;
	$: idAtividade = $page.params.idAtividade;
	$: idEtapa = $page.params.idEtapa;
	$: arquivos = [...arquivos, arquivo];

	const entregas_por_estudante = data.estudantes
		.map((estudante) => {
			const entrega = data.entregas.find((ent) => ent.id_estudante === estudante.id);
			return entrega != undefined
				? { ...estudante, ...entrega }
				: { ...estudante, data_entrega: null };
		})
		.sort((a, b) => a.nome.localeCompare(b.nome));

	const formatter = new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	const onClick = (idEntrega) => {
		goto(`/professor/turmas/${id}/atividades/${idAtividade}/${idEtapa}/${idEntrega}`);
	};
</script>

<div class="content-etapa">
	<h1>{data.atividade.titulo}</h1>
	<h2>Etapa: {data.etapa.titulo}</h2>
	<p>{data.etapa.descricao}</p>
	<AtividadeInfo
		realizacao={data.etapa.em_grupos ? 'Em Grupos' : 'Individual'}
		prazo={formatter.format(data.atividade.data_entrega_final)}
		avaliacao={data.etapa.em_grupos ? 'Em Grupos' : 'Individual'}
	/>
	<div class="container-entregas">
		<div class="entregas-header">
			<p>Entregas:</p>
		</div>
		<div class="entregas">
			{#each entregas_por_estudante as entrega}
				<EnvioEstudante {entrega} onClick={() => onClick(entrega.id)} />
			{/each}
		</div>
	</div>
</div>

<style scoped>
	.content-etapa {
		display: flex;
		flex-direction: column;
		text-align: center;
		padding-top: 126px;
		padding-left: 96px;
		padding-right: 96px;
	}

	.content-etapa > h1 {
		margin-bottom: 12px;
	}

	.content-etapa > h2 {
		margin-bottom: 36px;
	}

	.content-etapa > h2 {
		margin-bottom: 24px;
	}

	.content-etapa > p {
		margin-bottom: 24px;
	}

	.entregas-header {
		padding-left: 48px;
		font-size: 24px;
		text-align: left;
	}

	.entregas {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 24px;
		justify-content: center;
	}
</style>
