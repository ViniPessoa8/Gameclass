<script>
	import icon_mural_da_turma from '$lib/assets/icon_mural_da_turma.png';
	import icon_atividades from '$lib/assets/icon_atividades.png';
	import icon_pontuacao from '$lib/assets/icon_pontuacao.png';
	import icon_membros from '$lib/assets/icon_membros.png';
	import TurmaTabBarItem from './TurmaTabBarItem.svelte';

	export let selectedItem = 1;

	const tabs = [
		{
			text: 'Mural da Turma',
			icon: icon_mural_da_turma,
			alt: 'Ícone do mural da turma'
		},
		{
			text: 'Atividades',
			icon: icon_atividades,
			alt: 'Ícone de atividades'
		},
		{
			text: 'Pontuação',
			icon: icon_pontuacao,
			alt: 'Ícone de potuação'
		},
		{
			text: 'Membros',
			icon: icon_membros,
			alt: 'Ícone de membros'
		}
	];

	function onClick(index) {
		console.debug('selecionou:', index);
		// TODO: Redirecionar para a pagina selecionada
		selectedItem = index;
	}
</script>

<div class="tab-bar">
	{#each tabs as tab, index}
		{#if index === selectedItem}
			<TurmaTabBarItem
				text={tab.text}
				icon={tab.icon}
				alt={tab.alt}
				underline="true"
				onClick={() => onClick(index)}
			/>
		{:else}
			<TurmaTabBarItem
				text={tab.text}
				icon={tab.icon}
				alt={tab.alt}
				onClick={() => onClick(index)}
			/>
		{/if}
	{/each}
</div>

<style>
	.tab-bar {
		/* TODO: font-family: lato ; */
		font-weight: 900;
		margin-top: 24px;
		margin-left: 96px;
		display: flex;
		flex-direction: row;
	}
</style>
