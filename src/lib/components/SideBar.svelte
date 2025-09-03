<script>
	import Button from './Button.svelte';
	import SideBarButton from './SideBarButton.svelte';

	import SideBarTurma from './SideBarTurma.svelte';
	import { goto } from '$app/navigation';

	let { perfil, turmas } = $props();
	console.log(`[/Autenticado/Turmas] (${perfil})`);

	async function logout() {
		await fetch('/logout', {
			method: 'POST'
		});
		window.location.href = '/login';
	}
</script>

<div class="sidebar">
	<div class="buttons">
		<SideBarButton
			img={'home'}
			onClick={() => {
				goto(`/${perfil}/turmas`);
			}}>Home</SideBarButton
		>
		<SideBarButton onClick={logout} img={'logout'}>Logout</SideBarButton>
	</div>

	<div class="turmas">
		<div class="turma">
			{#if turmas?.length > 0}
				{#each turmas as turma}
					<SideBarTurma {turma} {perfil} />
				{/each}
			{/if}
		</div>
	</div>

	<Button
		on:click={() => {
			if (perfil === 'professor') {
				goto(`/${perfil}/turmas/create`);
			}

			if (perfil === 'estudante') {
				console.log('Participar de uma turma existente');
			}
		}}
	>
		{#if perfil === 'estudante'}
			+ Participar de Turma
		{:else if perfil === 'professor'}
			+ Criar Nova Turma
		{/if}
	</Button>
</div>

<style>
	.sidebar {
		background-color: var(--cor-primaria);
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100%;
		min-width: 324px;
		padding-top: 80px;
	}

	.buttons {
		display: flex;
		margin-bottom: 84px;
	}

	.turma {
		color: white;
		margin-bottom: 32px;
	}
</style>
