<script>
	import { goto } from '$app/navigation';

	/**
	 * @typedef {Object} Props
	 * @property {string} [nome]
	 * @property {number} [ano]
	 * @property {string} [disciplina]
	 * @property {number} [idTurma]
	 */

	/** @type {Props} */
	let {
		nome = '',
		ano = 0,
		disciplina = '',
		idTurma = 0
	} = $props();

	function onClick() {
		const url = `/professor/turmas/${idTurma}`;
		goto(url);
	}
</script>

<button class="container" onclick={onClick}>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{nome}</b></p>
		<hr style="border-color: var(--cor-secundaria)">
		<p style="font-size: 20px; margin-top: 4px">{disciplina} - {ano}</p>
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
