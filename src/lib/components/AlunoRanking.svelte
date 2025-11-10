<script>
	import CircularTextIcon from './CircularTextIcon.svelte';
	import PopupAluno from './PopupAluno.svelte'; // Importe o novo componente

	/**
	 * @typedef {Object} Props
	 * @property {string} [nome] - Apelido do aluno
	 * @property {string} [nomeReal] - Nome real do aluno
	 * @property {string} [email] - Email do aluno
	 * @property {number} [pontos]
	 * @property {number} [posicao]
	 * @property {string} [cor]
	 * @property {number} [idEstudante]
	 * @property {number} [idTurma]
	 */

	/** @type {Props} */
	let {
		login = '',
		nome = 'Nome não informado', // Adicione os novos props
		email = 'email@naoinformado.com', // Adicione os novos props
		pontos = 0,
		posicao = 0,
		cor = 'var(--cor-primaria)',
		idEstudante = 0,
		idTurma = 0
	} = $props();

	let showPopup = $state(false);

	function onClick() {
		// Em vez de navegar, agora mostramos o popup
		showPopup = true;
	}
</script>

<button class="container" onclick={onClick}>
	<CircularTextIcon backgroundColor={cor}>{posicao}°</CircularTextIcon>
	<div class="info-container">
		<p style="font-size: 20px;"><b>{nome}</b></p>
		<p style="font-size: 18px;">{pontos} pontos</p>
	</div>
</button>

{#if showPopup}
	<PopupAluno
		{login}
		{nome}
		{email}
		{pontos}
		{idEstudante}
		{idTurma}
		on:close={() => (showPopup = false)}
	/>
{/if}

<style>
	.container {
		box-sizing: border-box;
		border: none;
		width: 100%;
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
