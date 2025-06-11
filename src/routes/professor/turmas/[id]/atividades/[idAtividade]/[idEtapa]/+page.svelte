<script>
	import CircularIcon from '$lib/components/CircularIcon.svelte';
	import Comentario from '$lib/components/Comentario.svelte';
	import Button from '$lib/components/Button.svelte';
	import Anexo from '$lib/components/Anexo.svelte';
	import InputText from '$lib/components/InputText.svelte';
	import { ATRIBUICAO } from '$lib/constants.js';
	import AtividadeInfo from '$lib/components/AtividadeInfo.svelte';
	import { page } from '$app/stores';
	import EnvioEntrega from '$lib/components/EnvioEntrega.svelte';
	import { goto } from '$app/navigation';
	import Entrega from '$lib/models/Entrega.js';

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

	let entregas_por_estudante = [];
	let entregas_por_grupo = [];

	if (data.etapa.em_grupos) {
		const totalDeGrupos = data.etapa.formacoes.reduce((acc, f) => acc + f.numero_grupos, 0);

		data.etapa.grupos.sort((a, b) => (a.data_criacao > b.data_criacao ? -1 : 1));

		for (let i = 0; i < totalDeGrupos; i++) {
			if (i < data.etapa.grupos.length) {
				const grupo = data.etapa.grupos[i];
				const entrega = data.entregas.find((e) => e.id_grupo_de_alunos == grupo.id);

				if (entrega) {
					entrega.grupo = grupo;
					entrega.em_grupos = true;
					entregas_por_grupo.push(entrega);
				} else {
					entregas_por_grupo.push(data.etapa.grupos[i]);
				}
			} else {
				entregas_por_grupo.push(null);
			}
		}
		console.debug('entregas_por_grupo => ', entregas_por_grupo);
	} else {
		entregas_por_estudante = data.estudantes
			.map((estudante) => {
				const entrega = data.entregas.find((ent) => ent.id_estudante === estudante.id);

				if (entrega != undefined) {
					entrega.em_grupos = false;
					return { ...estudante, ...entrega };
				}

				return { ...estudante, data_entrega: null };
			})
			.sort((a, b) => a.nome.localeCompare(b.nome));
	}

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

	let somaPesos = 0;
	let somaPonderada = 0;

	data.etapa.criterios.forEach((c) => {
		somaPesos += c.peso;
		somaPonderada += c.pontuacao_max * c.peso;
	});

	const notaMaximaItemAtividade = somaPonderada / somaPesos;

	const atividadeInfo = {
		Realização: data.etapa.em_grupos ? 'Em Grupos' : 'Individual',
		Prazo: formatter.format(data.atividade.data_entrega_final),
		Média: data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples ? 'Simples' : 'Ponderada',
		'Nota Máx.': notaMaximaItemAtividade
	};
</script>

<div class="content-etapa">
	<h1>{data.atividade.titulo}</h1>
	<h2>Etapa: {data.etapa.titulo}</h2>
	<p>{data.etapa.descricao}</p>
	<AtividadeInfo data={atividadeInfo} />
	<div class="container-entregas">
		<div class="entregas-header">
			<p>Entregas:</p>
		</div>
		<div class="entregas">
			{#if data.etapa.em_grupos}
				{#each entregas_por_grupo as entrega}
					<EnvioEntrega {entrega} onClick={() => onClick(entrega.id)} />
				{/each}
			{:else}
				{#each entregas_por_estudante as entrega}
					<EnvioEntrega {entrega} onClick={() => onClick(entrega.id)} />
				{/each}
			{/if}
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
