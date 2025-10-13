<script>
	import { Toaster, toast } from 'svelte-sonner';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';
	import icon_calendario from '$lib/assets/icon_calendario.png';
	import icon_mais from '$lib/assets/icon_mais.png';
	import icon_menos from '$lib/assets/icon_menos.png';
	import { slide } from 'svelte/transition';
	import { formataData } from '$lib/utils/util';

	let { data } = $props();
	let mostraAtividades = $state(data.atividades.map(() => false));
	const dateOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timezone: 'America/Manaus'
	};

	if (!$selectedTurmaTabBar) {
		$selectedTurmaTabBar = 4;
	}
</script>

<Toaster richColors position="top-center" closeButton />
<TurmaTabBar />
<div class="content-relatorio">
	<h1>Relatório da turma</h1>
	<div class="relatorio-grid">
		<div class="visao-geral">
			<h2>Visão Geral</h2>
			<div class="grid-item-flex">
				<div class="card">
					<div class="info">
						<img src={icon_calendario} alt="ícone de calendário" />
						<p>Criada em:</p>
						<!-- <h3>{data.turma.data_criacao.toLocaleString('pt-BR', dateOptions)}</h3> -->
						<h3>{formataData(data.turma.data_criacao)}</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="alunos">
			<h2>Alunos ({data.estudantes.length})</h2>
			<div class="grid-item-flex" style="flex-direction: column;">
				<div class="card" style="display: flex; flex-direction: column;">
					<div class="info">
						<p>Média da turma:</p>
						<h3>{data.mediaTurma.toFixed(1)}</h3>
					</div>
					<div class="info">
						<p>Menor nota da turma:</p>
						<h3>
							{data.menorNota.toFixed(1)}
						</h3>
					</div>
					<div class="info">
						<p>Maior nota da turma:</p>
						<h3>
							{data.maiorNota?.toFixed(1)}
						</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="atividades">
			<h2>Atividades ({data.atividades.length})</h2>
			<div class="grid-item-flex" style="flex-direction: column;">
				{#each data.atividades as atividade, index}
					<div class="card" style="display: flex; flex-direction: column;">
						<button
							class="titulo-atividade"
							style=""
							onclick={() => (mostraAtividades[index] = !mostraAtividades[index])}
						>
							<div class="titulo-atividade-content">
								<h3>{atividade.titulo}</h3>
								<p>({atividade.itensAtividade.length} etapas)</p>
							</div>
							{#if mostraAtividades[index] != false}
								<img src={icon_menos} alt="icone de soma" />
							{:else}
								<img src={icon_mais} alt="icone de subtração" />
							{/if}
						</button>
						<hr />

						{#if mostraAtividades[index] != false}
							<div class="atividade-content" transition:slide={{ duration: 400 }}>
								<p>Prazo: <b>{atividade.prazo.toLocaleString('pt-BR', dateOptions)}</b></p>
								<p>Nota Máxima: <b>{atividade.notaMax.toFixed(1)}</b></p>
								<p>Média de notas: <b>{atividade.mediaNotas.toFixed(1)}</b></p>
								<p>Nota Máxima Obtida: <b>{atividade.notaMaxObtida.toFixed(1)}</b></p>
								<p>Nota Mínima Obtida: <b>{atividade.notaMinObtida.toFixed(1)}</b></p>
								<p>
									Entregas: <b>{atividade.totalEntregasRealizadas} / {atividade.totalEntregas}</b>
								</p>
								{#each atividade.itensAtividade as itemAtividade, indexIA}
									<h3>{indexIA + 1}) {itemAtividade.titulo}</h3>
									<div class="item-atividade-content">
										<p>
											Prazo: <b
												>{itemAtividade.data_entrega_final.toLocaleString('pt-BR', dateOptions)}</b
											>
										</p>
										<p>Nota Máxima: <b>{itemAtividade.notaMax.toFixed(1)}</b></p>
										<p>Média de notas: <b>{itemAtividade.mediaNotas.toFixed(1)}</b></p>
										<p>Nota Máxima Obtida: <b>{itemAtividade.notaMaxObtida.toFixed(1)}</b></p>
										<p>Nota Mínima Obtida: <b>{itemAtividade.notaMinObtida.toFixed(1)}</b></p>
										<p>
											Entregas: <b
												>{itemAtividade.totalEntregasRealizadas} / {itemAtividade.totalEntregas}</b
											>
										</p>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style scoped>
	.content-relatorio {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 24px;
		padding: 24px 128px;
	}

	.relatorio-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		gap: 24px;
	}

	.relatorio-grid > div {
		padding: 8px;
	}

	.relatorio-grid > div > h2 {
		padding-bottom: 12px;
	}

	.atividades {
		grid-column-start: 1;
		grid-column-end: 3;
	}

	.card {
		display: flex;
		flex-direction: row;
		border: 1px solid grey;
		border-radius: 4px;
		background-color: #e8f1f9;
		width: fit-content;
		padding: 8px;
		font-weight: 600;
		font-size: 18px;
		gap: 8px;
	}

	.grid-item-flex {
		display: flex;
		flex-direction: row;
		gap: 12px;
	}

	.info {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;
	}

	.titulo-atividade {
		display: grid;
		grid-template-columns: 1fr 28px;
		width: 400px;
		flex-direction: row;
		justify-content: space-between;
		border: none;
		background-color: #e8f1f9;
		font-size: 18px;
		color: var(--cor-primaria);
		font-family: var(--fonte);
		cursor: pointer;
	}

	.titulo-atividade-content {
		display: grid;
		grid-template-columns: 1;
		flex-direction: row;
		gap: 8px;
	}

	.titulo-atividade > img {
		width: 28px;
		height: 28px;
	}

	.atividade-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item-atividade-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-left: 12px;
		margin-bottom: 12px;
	}
</style>
