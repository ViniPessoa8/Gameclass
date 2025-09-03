<script>
	import CircularTextIcon from './CircularTextIcon.svelte';
	import { goto } from '$app/navigation';

	/**
	 * @typedef {Object} Props
	 * @property {string} [nome]
	 * @property {number} [pontos]
	 * @property {number} [posicao]
	 * @property {string} [cor]
	 * @property {number} [idEstudante]
	 * @property {number} [idTurma]
	 */

	/** @type {Props} */
	let {
		nome = '',
		pontos = 0,
		posicao = 0,
		cor = 'var(--cor-primaria)',
		idEstudante = 0,
		idTurma = 0
	} = $props();

	function onClick() {
		const url = `/professor/turmas/${idTurma}/membros/${idEstudante}`;
		goto(url);
	}
</script>

<button class="container" onclick={onClick}>
	<CircularTextIcon backgroundColor={cor}>{posicao}°</CircularTextIcon>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{nome}</b></p>
		<p style="font-size: 18px;">{pontos} pts</p>
	</div>
</button>

<style>
	.container {
		border: none;
		width: 301px;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: white;
		margin: 8px;
		padding: 8px 0px 8px 8px;
		border-radius: 50px;
		gap: 12px;
		cursor: pointer;
		color: var(--cor-primaria);
	}

	.info-container {
		display: flex;
		flex-direction: column;
		padding-right: 30px;
		text-align: left;
		width: 100%;
	}
</style>
