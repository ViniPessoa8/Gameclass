<script>
	import CircularIcon from './CircularIcon.svelte';
	import Button from './Button.svelte';
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import FlexibleProgressBar from './FlexibleProgressBar.svelte';
	import selectedTurma from '$src/stores/selectedTurma';
	import { goto } from '$app/navigation';
	import ButtonRedirect from './ButtonRedirect.svelte';
	import icon_relatorio from '$lib/assets/icon_relatorio.png';

	export let turma;
	export let width;

	console.debug('turma => ', turma);

	const segments = [];

	const total_atividades_abertas = turma.atividades.filter((i) => i.prazo >= Date.now()).length;
	if (total_atividades_abertas > 0) {
		segments.push({
			name: 'atividades_abertas',
			descricao: 'Atividades abertas',
			backgroundColor: 'var(--cor-secundaria-2)',
			color: 'black',
			value: total_atividades_abertas
		});
	}

	const total_atividades_concluidas = turma.atividades.filter((i) => i.prazo <= Date.now()).length;
	if (total_atividades_concluidas > 0) {
		segments.push({
			name: 'atividades_concluidas',
			descricao: 'Atividades concluídas',
			backgroundColor: 'var(--cor-secundaria-4)',
			color: 'black',
			value: total_atividades_concluidas
		});
	}

	if (segments.length == 0) {
		segments.push({
			name: 'sem_atividades',
			descricao: 'Não há atividades cadastradas',
			backgroundColor: 'var(--cor-secundaria-1)',
			color: 'black',
			value: 0
		});
	}
</script>

<div class="turma">
	<div class="turma-info" bind:clientWidth={width}>
		<div class="turma-icon">
			<CircularIcon type="text" backgroundColor="#{turma.cor}" text={turma.nome[0]} />
		</div>
		<div class="turma-data">
			<h1>{turma.nome}</h1>
			<span>{turma.disciplina}</span>
			<div>
				<span>{turma.ano}</span>
				<span>{turma.numero_alunos} Estudantes</span>
			</div>
		</div>
	</div>
	<div class="turma-progresso">
		<span>Progresso de Atividades</span>

		<FlexibleProgressBar {segments} />
		<!-- <BarraDeProgresso {width} /> -->
	</div>
	<div class="turma-buttons">
		<Button
			on:click={() => {
				goto('turmas/' + turma.id);
				$selectedTurma = turma.id;
			}}>Abrir</Button
		>
		<ButtonRedirect href="turmas/{turma.id}/relatorio">
			<img class="icon_relatorio" src={icon_relatorio} alt="icone_relatorio" />
			Relatório da Turma</ButtonRedirect
		>
	</div>
</div>

<style>
	.turma {
		background-color: var(--cor-primaria);
		box-sizing: border-box;
		width: 420px;
		height: 278px;
		border-radius: 20px;
		padding: 35px 16px;
	}

	.turma-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.turma-data {
		color: white;
		text-align: start;
		margin-left: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.turma-data > div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 60px;
	}

	.turma-data > h1 {
		font-size: 20px;
	}

	.turma-data > span {
		font-size: 16px;
	}

	.turma-progresso {
		margin-top: 33px;
		color: white;
	}

	.turma-buttons {
		margin-top: 14px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.icon_relatorio {
		margin-right: 8px;
	}
</style>
