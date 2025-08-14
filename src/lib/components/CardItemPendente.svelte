
<script>
	import { goto } from '$app/navigation';

	export let nome = '',
		pendencias = 0,
		disciplina = '',
		idTurma = 0,
		idAtividade = 0,
		idItemAtividade = 0;

	function onClick() {
		const url = `/professor/turmas/${idTurma}/atividades/${idAtividade}/${idItemAtividade}`;
		goto(url);
	}
</script>

<button class="container" on:click={onClick}>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{nome}</b></p>
		<p style="font-size: 20px; margin-top: 4px; margin-bottom: 4px">{disciplina}</p>
		<hr style="border-color: var(--cor-secundaria-2)">
		<p style="font-size: 20px; margin-top: 4px; color: var(--cor-secundaria-2)">{pendencias} pendência(s)</p>
	</div>
</button>

<style>
	.container {
		border: none;
		min-width: 300px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		margin: 8px;
		padding: 8px 8px 8px 8px;
		border-radius: 50px;
		gap: 12px;
		cursor: pointer;
		color: var(--text-1);
		background-color: var(--cor-primaria)
	}

	.info-container {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 100%;
	}
</style>
