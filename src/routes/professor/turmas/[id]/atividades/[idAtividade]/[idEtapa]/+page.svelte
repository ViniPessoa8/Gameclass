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

	const statusColor = 'blue';
	const iconColor = 'red';
	// TODO: Pegar descrição do banco de dados
	const descricaoEtapa =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet lacinia felis. Quisque maximus sit amet magna quis dapibus. Quisque mollis dui vel nisi commodo, nec aliquet ante tempor. Suspendisse at eros tristique, volutpat mi faucibus, viverra nibh. Nullam sagittis, sem in viverra blandit, nulla felis sollicitudin arcu, eu maximus ligula justo non tortor. Mauris sollicitudin scelerisque sapien tempor maximus. Sed in cursus magna. Suspendisse potenti. Nulla dolor nisl, tristique sit amet bibendum nec, auctor nec risus. Aenean tincidunt mi purus, at mollis quam faucibus in. Sed dictum erat arcu, vitae feugiat justo gravida ut.';

	// TODO: Integrar comentários com o banco de dados
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

	let id;
	let idAtividade;
	let idEtapa;
	let arquivos = [];
	let arquivo = 'teste';

	$: perfil = $page.params.perfil;
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

	console.debug(data.etapa);
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
				{#if entrega.data_entrega != null}
					<EnvioEstudante
						nome={entrega.nome}
						data_envio={formatter.format(entrega.data_entrega)}
						onClick={() => onClick(entrega.id)}
					/>
				{:else}
					<EnvioEstudante nome={entrega.nome} data_envio={null} />
				{/if}
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
