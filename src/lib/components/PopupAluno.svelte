<script>
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} login - O login de usuário/apelido do aluno (Ex: Aluno12)
	 * @property {string} nome - O nome completo do aluno
	 * @property {string} email - O email do aluno
	 * @property {number} pontos - Os pontos do aluno na turma
	 * @property {number} idEstudante - O ID do estudante
	 * @property {number} idTurma - O ID da turma
	 */

	/** @type {Props} */
	export let login = 'Aluno';
	export let nome = 'Nome real do aluno';
	export let email = 'email@exemplo.com';
	export let pontos = 0;
	export let idEstudante = 0;
	export let idTurma = 0;

	const dispatch = createEventDispatcher();

	function fecharPopup() {
		dispatch('close');
	}

	function verPerfil() {
		const url = `/professor/turmas/${idTurma}/membros/${idEstudante}`;
		fecharPopup();
		goto(url);
	}
</script>

<div class="overlay" on:click={fecharPopup} on:keydown={() => {}} role="button" tabindex="0">
	<div class="popup-container" on:click|stopPropagation>
		<div class="icon-placeholder">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="80"
				height="80"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-user"
				><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"
				></circle></svg
			>
		</div>

		<h2>{nome}</h2>
		<p class="detail">{login}</p>
		<p class="detail email">{email}</p>

		<p class="points">Pontos na turma: <b>{pontos}</b></p>

		<button class="profile-button" on:click={verPerfil}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-user"
				><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"
				></circle></svg
			>
			Ver Perfil
		</button>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.popup-container {
		background-color: #0d2d6c; /* Cor azul escura da imagem */
		color: white;
		padding: 40px 20px;
		border-radius: 24px;
		width: 90%;
		max-width: 350px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		font-family: sans-serif;
		text-align: center;
	}

	.icon-placeholder {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #2a9d8f; /* Um azul mais claro para o ícone */
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 16px;
	}

	.icon-placeholder svg {
		color: white;
	}

	h2 {
		margin: 0;
		font-size: 28px;
		font-weight: bold;
		text-decoration: underline;
	}

	.detail {
		margin: 2px 0;
		font-size: 16px;
		color: #e0e0e0;
	}

	.email {
		font-size: 14px;
		color: #b0b0b0;
		margin-bottom: 20px;
	}

	.points {
		font-size: 20px;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.profile-button {
		background-color: white;
		color: #0d2d6c;
		border: none;
		border-radius: 50px;
		padding: 12px 30px;
		font-size: 18px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 8px;
		transition: transform 0.2s ease;
	}

	.profile-button:hover {
		transform: scale(1.05);
	}
</style>
