<script>
	import CircularTextIcon from './CircularTextIcon.svelte';
	import selectedTurma from '$src/stores/selectedTurma.js';

	export let turma;
	console.log(turma);

	const acronym = turma.nome[0];
	const color = turma.cor;

	let backgroundColor;
	$: {
		if ($selectedTurma === turma.id) {
			console.log('Selected ', turma.id);
			backgroundColor = 'var(--cor-secundaria)';
		} else {
			backgroundColor = '';
		}
	}
</script>

<div
	class="turma"
	aria-hidden="true"
	style="background-color: {backgroundColor};"
	bind
	on:click={() => {
		console.debug('clicked');
		$selectedTurma = turma.id;
		console.log($selectedTurma);
	}}
>
	<CircularTextIcon backgroundColor="#{color}">{acronym}</CircularTextIcon>
	<h1>{turma.nome}</h1>
</div>

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
		border-radius: 32px;
		margin-top: 8px;
	}

	.turma:hover {
		border: 1px solid rgba(54, 136, 181, 1);
		transition: border 200ms;
	}

	.turma > h1 {
		max-width: 90%;
		font-size: 20px;

		overflow: hidden;
		white-space: nowrap;
		text-wrap: nowrap;
		text-overflow: ellipsis;
	}
</style>
