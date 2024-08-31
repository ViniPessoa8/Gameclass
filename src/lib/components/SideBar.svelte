<script>
	import Button from './Button.svelte';
	import SideBarButton from './SideBarButton.svelte';
	import SideBarTurma from './SideBarTurma.svelte';

	export let perfil;
	console.log(`[/Autenticado/Turmas] (${perfil})`);
	console.log(perfil);
</script>

<div class="sidebar">
	<div class="buttons">
		<SideBarButton img={'home'}>Home</SideBarButton>
		<SideBarButton img={'logout'}>Logout</SideBarButton>
	</div>

	<div class="turmas">
		<div class="turma">
			<SideBarTurma acronym="CA" color={'red'}>Calculados - 2023</SideBarTurma>
			<SideBarTurma acronym="AE" color={'green'}>AED 1 - 2023</SideBarTurma>
			<SideBarTurma acronym="ES" color={'black'}>Eng. de Soft. - 2023</SideBarTurma>
		</div>
	</div>

	<Button
		on:click={() => {
			if (perfil === 'professor') {
				console.log('entra a criação de turma');
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
