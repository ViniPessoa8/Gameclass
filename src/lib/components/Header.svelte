<script>
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import CircularIcon from './CircularIcon.svelte';

	export let session;

	// Constrói um array de segmentos da URL atual
	const segments = derived(page, ($page) => {
		const parts = $page.url.pathname.split('/').filter(Boolean); // remove vazios
		return parts.map((part, i) => {
			return {
				label: decodeURIComponent(part),
				href: '/' + parts.slice(0, i + 1).join('/')
			};
		});
	});
</script>

<div class="header">
	<nav aria-label="breadcrumb" class="caminho-de-pao">
		{#each $segments as s, i}
			<a class="caminho-de-pao-link" href={s.href}>{s.label}</a>
			{#if i < $segments.length - 1}
				<span>/</span>
			{/if}
		{/each}
	</nav>
	<div class="logged-user">
		<div class="info">
			<h4 class="logged-user-name">{session.login}</h4>
			<p class="logged-user-role">{session.perfil}</p>
		</div>
		<CircularIcon
			type="text"
			backgroundColor={'#' + session.cor}
			text={session.login[0].toUpperCase()}
		/>
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
