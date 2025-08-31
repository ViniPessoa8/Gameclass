<script>
	import CircularIcon from './CircularIcon.svelte';
	import selectedTurma from '$src/stores/selectedTurma.js';
	import { goto } from '$app/navigation';
	import { Tooltip } from '@svelte-plugins/tooltips';

	export let turma;
	export let perfil;

	const acronym = turma.nome[0];
	const color = turma.cor;

	let backgroundColor, disciplinaCor;
	$: {
		if ($selectedTurma === turma.id) {
			backgroundColor = 'var(--cor-secundaria)';
			disciplinaCor = 'var(--cor-primaria)';
		} else {
			backgroundColor = '';
			disciplinaCor = 'var(--cor-secundaria)';
		}
	}
</script>

<Tooltip content="This is my tooltip message." delay="1000">
	<div
		class="turma"
		aria-hidden="true"
		style="background-color: {backgroundColor};"
		on:click={() => {
			const url = `/${perfil}/turmas/${turma.id}/atividades`;
			goto(url);
		}}
	>
		<CircularIcon backgroundColor="#{color}" text={acronym} type="text" />
		<div class="info">
			<h1>{turma.nome}</h1>
			<p style="color:{disciplinaCor}">{turma.disciplina}</p>
		</div>
	</div>
</Tooltip>

<style>
	.turma {
		width: 300px;
		border: 1px solid rgba(54, 136, 181, 0);
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 5px;
		cursor: pointer;
		transition: border 100ms;
		transition: background-color 100ms;
		border-radius: 32px;
		margin-top: 8px;
	}

	.turma:hover {
		border: 1px solid rgba(54, 136, 181, 1);
		transition: border 200ms;
		transition: background-color 200ms;
	}

	.info {
		max-width: 90%;
		display: flex;
		flex-direction: column;
	}

	.info > h1 {
		font-size: 20px;

		overflow: hidden;
		white-space: nowrap;
		text-wrap: nowrap;
		text-overflow: ellipsis;
	}

	.info > p {
		color: var(--cor-secundaria);
		transition: color 200ms;
	}
</style>
