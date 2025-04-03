<script>
	import CircularIcon from './CircularIcon.svelte';
	import Button from './Button.svelte';
	import BarraDeProgresso from './BarraDeProgresso.svelte';
	import selectedTurma from '$src/stores/selectedTurma';
	import { goto } from '$app/navigation';

	export let turma;
	export let width;
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
		<BarraDeProgresso {width} />
	</div>
	<div class="turma-buttons">
		<Button
			on:click={() => {
				goto('turmas/' + turma.id);
				$selectedTurma = turma.id;
			}}>Abrir</Button
		>
		<Button>Relatório da Turma</Button>
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
</style>
