<script>
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import CircularIcon from './CircularIcon.svelte';
	import { goto } from '$app/navigation';
	import { debug } from '$lib/utils/logger';

	let { session } = $props();

	let segments = derived(page, ($page) => {
		let parts = $page.url.pathname.split('/').filter(Boolean); // remove vazios

		let labels = parts.map((part, i) => {
			let label = capitalizeFirstLetter(part);

			if (i == 2 && parts[2] && parts[2] != 'create') {
				label = session.turma.nome;
			}

			if (i == 4 && parts[3] == 'membros') {
				label = session.estudante.login;
			}

			if (parts[4] != 'create' && parts[3] != 'membros') {
				if (i == 4) {
					label = session.atividade.titulo;
				}

				if (i == 5 && parts[5] != 'edit') {
					label = session.etapa.titulo;
				}

				if (i == 6 && parts[6] != 'edit') {
					label = session.grupo ? session.grupo.nome : session.estudante.nome;
				}

				if (i == 7 && Number.isInteger(parts[7])) {
					label = session.integrante?.nome;
				}

				if (i == 8) {
					label = session.integrante?.nome;
				}
			}

			if (part == 'create') label = 'Criar atividade';
			if (part == 'etapas') label = 'Definir etapas e critérios';
			if (part == 'escolhaIntegrante') label = 'Escolher integrante';

			return {
				label: label,
				href: '/' + parts.slice(0, i + 1).join('/')
			};
		});

		// Diminui o tamanho do caminho ao passar de 5 elementos
		if (labels.length > 4) {
			labels = [{ label: '...', href: '' }, ...labels.slice(-4, labels.length)];
		}

		return labels;
	});

	function capitalizeFirstLetter(str) {
		if (str === null || str === undefined || str.length === 0) {
			return '';
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	let showPopup = $state(false);
	let userButtonElement;
	let popupElement = $state();

	function togglePopup() {
		showPopup = !showPopup;
	}

	function verPerfil() {
		showPopup = false;
		goto('/professor/perfil');
	}

	async function logout() {
		showPopup = false;
		await fetch('/logout', {
			method: 'POST'
		});
		window.location.href = '/login';
	}

	function handleClickOutside(event) {
		if (
			showPopup &&
			userButtonElement &&
			!userButtonElement.contains(event.target) &&
			popupElement &&
			!popupElement.contains(event.target)
		) {
			showPopup = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="header">
	<nav aria-label="breadcrumb" class="caminho-de-pao">
		{#each $segments as s, i}
			{#if i == $segments.length - 1}
				<b><p>{s.label}</p></b>
			{:else}
				<a class="caminho-de-pao-link" href={s.href}>{s.label}</a>
			{/if}
			{#if i < $segments.length - 1}
				<span> > </span>
			{/if}
		{/each}
	</nav>

	<div class="logged-user-container">
		<button class="logged-user" onclick={togglePopup} bind:this={userButtonElement}>
			<div class="info">
				<h4 class="logged-user-name">{session.login}</h4>
				<p class="logged-user-role">{session.perfil}</p>
			</div>
			<CircularIcon
				type="text"
				backgroundColor={'#' + session.cor}
				text={session.login[0].toUpperCase()}
			/>
		</button>

		{#if showPopup}
			<div class="user-popup" bind:this={popupElement}>
				<ul>
					<li><button onclick={verPerfil}>Ver perfil</button></li>
					<li><button onclick={logout}>Sair</button></li>
				</ul>
			</div>
		{/if}
	</div>
</div>

<style>
	.header {
		background-color: var(--cor-primaria);
		display: flex;
		color: white;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		z-index: 1000;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.logged-user {
		display: flex;
		gap: 10px;
		text-align: end;
		border: none;
		background-color: var(--cor-primaria);
		color: white;
		align-items: center;
		cursor: pointer;
	}

	.logged-user-name {
		font-size: 22px;
	}

	.logged-user-role {
		text-transform: capitalize;
		font-size: 16px;
		color: var(--cor-secundaria);
		font-weight: bolder;
	}

	.caminho-de-pao {
		display: flex;
		flex-direction: row;
		gap: 8px;
		color: white;
	}

	.caminho-de-pao-link {
		color: white;
		text-decoration: none;
	}

	.caminho-de-pao-link:hover {
		color: var(--cor-secundaria);
	}

	.logged-user-container {
		position: relative;
	}

	.user-popup {
		position: absolute;
		top: 100%;
		right: 0;
		background-color: white;
		color: black;
		border-radius: 8px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
		z-index: 1001;
		min-width: 160px;
		margin-top: 8px;
		overflow: hidden;
	}

	.user-popup ul {
		list-style: none;
		padding: 4px 0;
		margin: 0;
	}

	.user-popup li button {
		display: block;
		width: 100%;
		padding: 10px 16px;
		background: none;
		border: none;
		color: #333;
		text-align: left;
		cursor: pointer;
		font-size: 16px;
	}

	.user-popup li button:hover {
		background-color: #f5f5f5; /* Cor de hover */
	}
</style>
