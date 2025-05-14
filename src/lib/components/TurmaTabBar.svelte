<script>
	import icon_mural_da_turma from '$lib/assets/icon_mural_da_turma.png';
	import icon_atividades from '$lib/assets/icon_atividades.png';
	import icon_pontuacao from '$lib/assets/icon_pontuacao.png';
	import icon_membros from '$lib/assets/icon_membros.png';
	import icon_relatorio from '$lib/assets/icon_relatorio.png';
	import TurmaTabBarItem from './TurmaTabBarItem.svelte';
	import { goto } from '$app/navigation';
	import selectedTurmaTabBar from '$src/stores/selectedTurmaTabBar.js';

	const tabs = [
		{
			text: 'Mural da Turma',
			icon: icon_mural_da_turma,
			alt: 'Ícone do mural da turma',
			page: 'mural'
		},
		{
			text: 'Atividades',
			icon: icon_atividades,
			alt: 'Ícone de atividades',
			page: 'atividades'
		},
		{
			text: 'Pontuação',
			icon: icon_pontuacao,
			alt: 'Ícone de Potuação',
			page: 'pontuacao'
		},
		{
			text: 'Membros',
			icon: icon_membros,
			alt: 'Ícone de membros',
			page: 'membros'
		},
		{
			text: 'Relatório',
			icon: icon_relatorio,
			alt: 'Ícone de relatório da turma',
			page: 'relatorio'
		}
	];

	function onClick(index) {
		$selectedTurmaTabBar = index;
		goto(tabs[$selectedTurmaTabBar].page);
	}
</script>

<div class="tab-bar">
	{#each tabs as tab, index}
		{#if index === $selectedTurmaTabBar}
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
