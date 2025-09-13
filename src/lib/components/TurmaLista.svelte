<script>
	import CircularIcon from './CircularIcon.svelte';
	import FlexibleProgressBar from './FlexibleProgressBar.svelte';
	import selectedTurma from '$src/stores/selectedTurma';
	import ButtonRedirect from './ButtonRedirect.svelte';
	import Button from './Button.svelte';
	import icon_relatorio from '$lib/assets/icon_relatorio.png';
	import { goto } from '$app/navigation';

	export let turma;

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

<article class="list-item-container">
	<div class="info-principal">
		<div class="turma-icon">
			<CircularIcon type="text" backgroundColor="#{turma.cor}" text={turma.nome[0]} />
		</div>
		<div class="texto-turma">
			<h3 class="nome">{turma.nome}</h3>
			<p class="disciplina">{turma.disciplina}</p>
		</div>
	</div>

	<div class="info-secundaria">
		<span class="estudantes">{turma.numero_alunos} Estudantes</span>
		<span class="ano">{turma.ano}</span>
	</div>

	<div class="progresso-container">
		<span>Progresso de Atividades</span>

		<FlexibleProgressBar {segments} />
		<!-- <BarraDeProgresso {width} /> -->
	</div>

	<div class="botoes-container">
		<Button
			on:click={() => {
				goto('turmas/' + turma.id);
				$selectedTurma = turma.id;
			}}>Abrir</Button
		>
		<ButtonRedirect href="turmas/{turma.id}/relatorio">
			<img class="icon_relatorio" src={icon_relatorio} alt="icone_relatorio" />
			Relatório</ButtonRedirect
		>
	</div>
</article>

<style>
	.list-item-container {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 16px 24px;
		background-color: var(--cor-primaria); 
		color: white;
		border-radius: 12px;
		gap: 20px;
		transition: transform 0.2s ease-in-out;
		cursor: pointer;
	}

	.list-item-container:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.info-principal {
		display: flex;
		align-items: center;
		gap: 16px;
		flex: 2; /* Ocupa mais espaço */
	}

	.inicial-container {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #e53935; /* Cor de exemplo, pode ser dinâmica */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		font-weight: bold;
		flex-shrink: 0;
	}

	.texto-turma .nome {
		font-size: 18px;
		font-weight: bold;
		margin: 0;
	}

	.texto-turma .disciplina {
		font-size: 14px;
		opacity: 0.8;
		margin: 0;
	}

	.info-secundaria {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: 18px;
		flex: 1;
	}

	.progresso-container {
		flex: 2;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.progresso-container label {
		font-size: 12px;
		opacity: 0.8;
	}

	progress {
		width: 100%;
		height: 8px;
		border-radius: 4px;
	}
	progress::-webkit-progress-bar {
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 4px;
	}
	progress::-webkit-progress-value {
		background-color: #ffffff;
		border-radius: 4px;
	}

	.botoes-container {
		display: flex;
		gap: 10px;
		flex: 1.5;
		justify-content: flex-end;
	}

	button {
		border: none;
		padding: 8px 16px;
		border-radius: 20px;
		font-weight: bold;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.btn-abrir {
		background-color: #f0f0f0;
		color: #333;
	}
	.btn-abrir:hover {
		background-color: #dcdcdc;
	}

	.btn-relatorio {
		background-color: rgba(255, 255, 255, 0.2);
		color: white;
	}
	.btn-relatorio:hover {
		background-color: rgba(255, 255, 255, 0.4);
	}
</style>
