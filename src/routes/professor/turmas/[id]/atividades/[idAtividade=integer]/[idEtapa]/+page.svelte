<script>
	import { run } from 'svelte/legacy';

	import { ATRIBUICAO } from '$lib/constants.js';
	import AtividadeInfo from '$lib/components/AtividadeInfo.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import SwitchView from '$lib/components/SwitchView.svelte';
	import EnvioEntregaGrade from '$lib/components/EnvioEntregaGrade.svelte';
	import EnvioEntregaLista from '$lib/components/EnvioEntregaLista.svelte';
	import CriteriosPopover from '$lib/components/CriteriosPopover.svelte';

	let { data } = $props();

	let id = $derived($page.params.id);
	let idAtividade = $derived($page.params.idAtividade);
	let idEtapa = $derived($page.params.idEtapa);
	let arquivos = $state([]);
	let arquivo = 'teste';

	let currentView = $state(data.visualizacao_entregas || 'grade');

	run(() => {
		arquivos = [...arquivos, arquivo];
	});

	let entregas_por_estudante = $state([]);
	let entregas_por_grupo = [];

	if (data.etapa.em_grupos) {
		if (!data.etapa.formacoes) {
			throw new Error('Não foram definidas formações para essa atividade');
		}

		const totalDeGrupos = data.etapa.formacoes.reduce((acc, f) => acc + f.numero_grupos, 0);

		data.etapa.grupos.sort((a, b) => (a.data_criacao > b.data_criacao ? -1 : 1));

		for (let i = 0; i < totalDeGrupos; i++) {
			if (i < data.etapa.grupos.length) {
				const grupo = data.etapa.grupos[i];
				const entrega = data.entregas.find((e) => e.id_grupo_de_alunos == grupo.id);

				if (entrega) {
					entrega.em_grupos = true;
					entregas_por_grupo.push({
						entrega,
						grupo,
						em_grupos: true,
						estudante: null,
						prazo: data.etapa.data_entrega_final,
						inicio: data.etapa.data_entrega_inicial
					});
				} else {
					entregas_por_grupo.push({
						entrega: null,
						grupo: grupo,
						em_grupos: true,
						estudante: null,
						prazo: data.etapa.data_entrega_final,
						inicio: data.etapa.data_entrega_inicial
					});
				}
			} else {
				entregas_por_grupo.push({
					entrega: null,
					grupo: null,
					em_grupos: true,
					estudante: null,
					prazo: data.etapa.data_entrega_final,
					inicio: data.etapa.data_entrega_inicial
				});
			}
		}
	} else {
		entregas_por_estudante = data.estudantes
			.map((estudante) => {
				const entrega = data.entregas.find((ent) => ent.id_estudante === estudante.id_estudante);

				if (entrega != undefined) {
					return {
						estudante: estudante,
						entrega: entrega,
						grupo: null,
						em_grupos: false,
						prazo: data.etapa.data_entrega_final,
						inicio: data.etapa.data_entrega_inicial
					};
				}

				return {
					estudante: estudante,
					entrega: null,
					grupo: null,
					em_grupos: false,
					prazo: data.etapa.data_entrega_final,
					inicio: data.etapa.data_entrega_inicial
				};
			})
			.sort((a, b) => a.estudante.nome.localeCompare(b.estudante.nome));
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

	let notaMaximaItemAtividade = 0;
	//TODO:
	if (data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples) {
		let soma = 0;

		data.etapa.criterios.forEach((c) => {
			soma += c.pontuacao_max;
		});

		notaMaximaItemAtividade = soma;
	} else {
		let somaPesos = 0;
		let somaPonderada = 0;

		data.etapa.criterios.forEach((c) => {
			somaPesos += c.peso;
			somaPonderada += c.pontuacao_max * c.peso;
		});

		notaMaximaItemAtividade = somaPonderada / somaPesos;
	}

	// let somaPesos = 0;
	// let somaPonderada = 0;
	//
	// data.etapa.criterios.forEach((c) => {
	// 	somaPesos += c.peso;
	// 	somaPonderada += c.pontuacao_max * c.peso;
	// });
	//
	// const notaMaximaItemAtividade = somaPonderada / somaPesos;
	// data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples;

	const atividadeInfo = {
		Avaliação: data.etapa.tipo_avaliacao_nota == 1 ? 'Individual' : 'Em grupos',
		Realização: data.etapa.em_grupos ? 'Em Grupos' : 'Individual',
		Prazo: formatter.format(data.etapa.data_entrega_final),
		Média: data.etapa.tipo_atribuicao_nota == ATRIBUICAO.media_simples ? 'Simples' : 'Ponderada',
		'Nota Máx.': notaMaximaItemAtividade
	};
</script>

<div class="content-etapa">
	<div class="content-header">
		<h1>{data.etapa.titulo}</h1>
		<h2>Atividade: {data.atividade.titulo}</h2>
	</div>
	<div class="content-data">
		<p>{data.etapa.descricao}</p>
		<AtividadeInfo data={atividadeInfo} />
		<CriteriosPopover criterios={data.etapa.criterios} />
		<div class="container-entregas">
			<div class="entregas-header">
				<SwitchView bind:view={currentView} preferenceKey="visualizacao_entregas" />
				<p>Entregas:</p>
			</div>
			{#if currentView == 'grade'}
				<div class="entregas grade">
					{#if data.etapa.em_grupos}
						{#each entregas_por_grupo as dados, index (index)}
							<EnvioEntregaGrade
								{dados}
								receberAposPrazo={data.etapa.receber_apos_prazo}
								tipoAvaliacaoNota={data.etapa.tipo_avaliacao_nota}
								onClick={() => onClick(dados.entrega?.id)}
							/>
						{/each}
					{:else}
						{#each entregas_por_estudante as dados, index (index)}
							<EnvioEntregaGrade
								{dados}
								receberAposPrazo={data.etapa.receber_apos_prazo}
								tipoAvaliacaoNota={data.etapa.tipo_avaliacao_nota}
								onClick={() => onClick(dados.entrega?.id)}
							/>
						{/each}
					{/if}
				</div>
			{:else}
				<div class="entregas lista">
					{#if data.etapa.em_grupos}
						{#each entregas_por_grupo as dados, index (index)}
							<EnvioEntregaLista
								{dados}
								receberAposPrazo={data.etapa.receber_apos_prazo}
								tipoAvaliacaoNota={data.etapa.tipo_avaliacao_nota}
								onClick={() => onClick(dados.entrega?.id)}
							/>
						{/each}
					{:else}
						{#each entregas_por_estudante as dados, index (index)}
							<EnvioEntregaLista
								{dados}
								receberAposPrazo={data.etapa.receber_apos_prazo}
								tipoAvaliacaoNota={data.etapa.tipo_avaliacao_nota}
								onClick={() => onClick(dados.entrega?.id)}
							/>
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style scoped>
	.content-etapa {
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		padding-top: 64px;
	}

	.content-header {
		width: 100%;
		background-color: lightgray;
	}

	.content-data {
		display: flex;
		flex-direction: column;
		padding-top: 36px;
		padding-left: 96px;
		padding-right: 96px;
		gap: 8px;
	}

	.content-data > p {
		margin-bottom: 24px;
	}

	.entregas-header {
		width: 50%;
		display: flex;
		flex-direction: row;
		margin-top: 36px;
		padding-left: 48px;
		font-size: 24px;
		text-align: center;
		align-items: center;
		justify-content: space-between;
	}

	.entregas {
		margin-top: 24px;
		gap: 16px;
	}

	.grade {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.lista {
		align-items: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}
</style>
