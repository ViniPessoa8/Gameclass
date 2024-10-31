<script>
	import Button from '$lib/components/Button.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import SideBarButton from '$lib/components/SideBarButton.svelte';
	import { goto } from '$app/navigation';
	import { LIMITE_NUMERO_DE_ETAPAS } from '$lib/constants';

	// TODO: Tornar etapas dinamicas
	// TODO: Fazer o input do título da etapa atualizar em tempo real o titulo da etapa na barra lateral
	export let etapas;
	export let selectedEtapa;
	console.assert(etapas != null, '[EtapasBarraLateral] etapas vazia');

	let backgroundColor = 'var(--cor-secundaria)';
	let textColor = 'white';
	let selectedBackgroundColor = 'var(--cor-primaria)';
	let selectedTextColor = 'white';
	let etapasContainer;
	let erroEtapa = [false, ''];
	function onRemoveEtapa(etapa) {
		selectedEtapa = selectedEtapa - 1;
		etapas = etapas.filter((elem) => elem !== etapa);
	}
</script>

<div class="tab">
	<div class="etapas-container" bind:this={etapasContainer}>
		<div class="header">
			<p>Etapas da Atividade</p>
			<IconeInformacao text="Título da etapa da atividade" alt="mais informações" />
		</div>
		{#each etapas as etapa, index}
			<div
				class="etapa"
				aria-hidden="true"
				style="
				background-color: {etapas[selectedEtapa].id === etapa.id
					? selectedBackgroundColor
					: backgroundColor};
				color: {etapas[selectedEtapa].id === etapa.id ? selectedTextColor : textColor};
				border: {etapas[selectedEtapa].id === etapa.id ? 'none' : '1px solid var(--cor-primaria)'};	
				font-weight: {etapas[selectedEtapa].id === etapa.id ? '700' : '500'};
				font-size: 24px;
				text-align: center;
				min-height: 48px;
				min-width: 200px;
				"
				on:click={() => {
					if (etapasContainer) {
						for (var i = 0, len = Array.from(etapasContainer.children).length; i < len; i++) {
							(function (index) {
								etapasContainer.children[i].onclick = function () {
									selectedEtapa = index - 1;
								};
							})(i);
						}
					}
					console.debug('selectedEtapa: ', selectedEtapa);
				}}
			>
				<div class="info">
					{#if etapa.titulo === ''}
						<p style="color: rgba(200,200,150,0.4); font-weight=100; text-align: center;">
							{index + 1}. (Título)
						</p>
					{:else}
						<div style="display: flex; flex-direction: row; gap: 8px">
							<p style="color: rgba(200,200,150,0.4); font-weight=100; text-align: center;">
								{index + 1}.
							</p>
							<p>{etapa.titulo}</p>
						</div>
					{/if}
				</div>
				{#if index !== 0}
					<Button
						color="var(--cor primaria)"
						type="button"
						on:click={() => {
							onRemoveEtapa(etapa);
						}}>X</Button
					>
				{/if}
			</div>
		{/each}
		{#if etapas.length < LIMITE_NUMERO_DE_ETAPAS}
			<Button
				marginTop="48px"
				color="var(--cor-secundaria)"
				backgroundColor="white"
				on:click={() => {
					console.debug(etapas[etapas.length - 1]);
					erroEtapa = [false, ''];

					if (etapas.length > LIMITE_NUMERO_DE_ETAPAS) {
						erroEtapa = [true, 'Limite de etapas atingido'];
						return;
					}

					etapas.push({
						id: etapas[etapas.length - 1].id + 1,
						titulo: '',
						dtEntregaMin: '1999-12-06T16:20', // TODO: usar a data atual
						dtEntregaMax: '1999-12-06T16:20',
						realizacaoGroup: 'Individual',
						atribuicaoNotasGroup: 'Média Simples',
						receberAposPrazo: true,
						criterios: [
							{
								titulo: 'Documentação',
								nota_max: 3.0
							},
							{
								titulo: 'Formatação',
								nota_max: 5.0
							},
							{
								titulo: 'Apresentação',
								nota_max: 2.0
							}
						]
					});
					selectedEtapa = selectedEtapa + 1;
				}}>+ Nova Etapa</Button
			>
		{/if}
		{#if erroEtapa[0]}
			<p style="color:red">{erroEtapa[1]}</p>
		{:else}
			<p style="color:red; visibility: hidden;">{erroEtapa[1]}</p>
		{/if}
	</div>
</div>

<style>
	.header > p {
		text-align: center;
		text-decoration: underline;
		font-size: 24px;
		margin-bottom: 24px;
	}

	.tab {
		display: flex;
		width: 300px;
		height: 100%;
		background-color: var(--cor-secundaria);
		margin-right: 12px;
		justify-content: center;
		align-items: center;
	}

	.etapas-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		gap: 24px;
	}

	.etapa {
		min-width: 150px;
		max-width: 250px;
		border: 1px solid rgba(54, 136, 181, 0);
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 10px;
		cursor: pointer;
		transition: border 100ms;
		transition: background-color 100ms;
		border-radius: 32px;
		margin-top: 8px;
	}

	.etapa:hover {
		border: 1px solid rgba(54, 136, 181, 1);
		transition: border 200ms;
		transition: background-color 200ms;
	}

	.info {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.info > h1 {
		font-size: 20px;
		overflow: hidden;
		white-space: nowrap;
		text-wrap: nowrap;
		text-overflow: ellipsis;
		text-align: center;
	}
</style>
