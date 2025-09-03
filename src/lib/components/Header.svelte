<script>
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import CircularIcon from './CircularIcon.svelte';
	import { goto } from '$app/navigation';

	let { session } = $props();

	// Constrói um array de segmentos da URL atual
	const segments = derived(page, ($page) => {
		let parts = $page.url.pathname.split('/').filter(Boolean); // remove vazios

		// Remove o resto da url se não for um número inteiro
		if (parts.length >= 7 && !Number.isInteger(parts[7])) {
			parts = parts.slice(0, 6);
		}

		return parts.map((part, i) => {
			let label = part;

			console.debug('parts =>', parts);

			if (i == 2 && parts[2] && parts[2] != 'create') {
				label = session.turma.nome;
			}

			if (i == 4 && parts[3] == 'membros') {
				label = session.estudante.login;
			}

			if (parts[4] != 'create' && parts[3] == 'atividades' && parts[6] == 'edit') {
				if (i == 4) {
					label = session.atividade.titulo;
				}

				if (i == 5) {
					label = session.etapa.titulo;
				}

				if (i == 6) {
					label = session.grupo ? session.grupo.nome : session.estudante.nome;
				}

				if (i == 7 && Number.isInteger(parts[7])) {
					label = session.integrante?.nome;
				}
			}

			return {
				label: label,
				href: '/' + parts.slice(0, i + 1).join('/')
			};
		});
	});

	function onClickUsuario() {
		goto('/professor/perfil');
	}
</script>

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
	<button class="logged-user" onclick={onClickUsuario}>
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
</style>
