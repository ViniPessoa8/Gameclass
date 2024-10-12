<script>
	import Button from '$lib/components/Button.svelte';
	import SideBarButton from '$lib/components/SideBarButton.svelte';
	import { goto } from '$app/navigation';

	// TODO: Tornar etapas dinamicas
	// TODO: Fazer o input do título da etapa atualizar em tempo real o titulo da etapa na barra lateral
	export let etapas;
	export let selectedEtapa;
	export let onMudaEtapa;
	console.assert(etapas != null, '[EtapasBarraLateral] data vazia');

	let backgroundColor = 'var(--cor-secundaria)';
	let textColor = 'white';
	let selectedBackgroundColor = 'var(--cor-primaria)';
	let selectedTextColor = 'white';
</script>

<div class="tab">
	<div class="etapas-container">
		{#each etapas as etapa}
			<div
				class="etapa"
				aria-hidden="true"
				style="
				background-color: {selectedEtapa === etapa.id ? selectedBackgroundColor : backgroundColor};
				color: {selectedEtapa === etapa.id ? selectedTextColor : textColor};
				border: {selectedEtapa !== etapa.id ? '1px solid var(--cor-primaria)' : 'none'};	
				min-height: 48px;
				min-width: 200px;
				"
				on:click={() => {
					selectedEtapa = etapa.id;
					console.debug(selectedEtapa);
					onMudaEtapa();
				}}
			>
				<div class="info">
					{#if etapa.titulo === ''}
						<p style="color: rgba(200,200,150,0.3); font-weight=100; text-align: center;">Titulo</p>
					{/if}
					<h1>{etapa.titulo}</h1>
				</div>
			</div>
		{/each}
		<Button
			marginTop="48px"
			color="var(--cor-secundaria)"
			backgroundColor="white"
			on:click={() => {
				console.debug(etapas[etapas.length - 1]);
				let newId = etapas[etapas.length - 1].id + 1;
				etapas.push({ id: newId, titulo: '' });
				selectedEtapa = newId;
				onMudaEtapa();
			}}>+ Nova Etapa</Button
		>
	</div>
</div>

<style>
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
		justify-content: center;
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

	.btn-nova-etapa {
		margin-top: 42px;
	}
</style>
