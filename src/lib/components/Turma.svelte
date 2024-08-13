<script>
	import { COLORS } from '../constants';
	import CircularTextIcon from './CircularTextIcon.svelte';
	import Button from './Button.svelte';
	import BarraDeProgresso from './BarraDeProgresso.svelte';

	export let titulo, disciplina, ano, nEstudantes;
</script>

<div class="turma" style="background-color: {COLORS.primaria_1}">
	<div class="turma-info">
		<div class="turma-icon">
			<CircularTextIcon size="90" fontSize="50" backgroundColor="red">{titulo[0]}</CircularTextIcon>
		</div>
		<div class="turma-data">
			<h1>{titulo}</h1>
			<span>{disciplina}</span>
			<div>
				<span>{ano}</span>
				<span>{nEstudantes} Estudantes</span>
			</div>
		</div>
	</div>
	<div class="turma-progresso">
		<span>Progresso de Atividades</span>
		<BarraDeProgresso />
	</div>
	<div class="turma-buttons">
		<Button>Abrir</Button>
		<Button>Relatório da Turma</Button>
	</div>
</div>

<style>
	.turma {
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
