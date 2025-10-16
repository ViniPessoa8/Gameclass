<script>
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import CircularTextIcon from './CircularTextIcon.svelte';

	let { integrante } = $props();

	let mediaNotas = $state();

	if (integrante.notas) {
		const somaNotas = integrante.notas.reduce((acc, n) => n.nota_atribuida + acc, 0);
		mediaNotas = somaNotas / integrante.notas.length;
	}
</script>

<button class="container" class:corrigido={mediaNotas} onclick={bubble('click')}>
	<CircularTextIcon backgroundColor={'#' + integrante.cor}>{integrante.nome[0]}</CircularTextIcon>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{integrante.nome} </b></p>
		{#if integrante.notas.length != 0}
			<p>Média: {mediaNotas.toFixed(1)}</p>
		{/if}
	</div>
</button>

<style>
	.container {
		cursor: pointer;
		border: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--cor-primaria);
		color: white;
		margin: 8px;
		padding: 8px 0px 8px 8px;
		border-radius: 50px;
		gap: 12px;
	}

	.corrigido {
		background-color: green;
	}

	.info-container {
		display: flex;
		flex-direction: column;
		padding-right: 30px;
		text-align: left;
	}
</style>
