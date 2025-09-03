<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import CardIntegrante from '$lib/components/CardIntegrante.svelte';
	import { comentarios, fetchComentarios } from '$lib/../stores/listaComentarios.js';
	import { STATUS_ENTREGA } from '$lib/constants.js';
	import { Toaster, toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data = $bindable() } = $props();

	let id = $derived($page.params.id);
	let idAtividade = $derived($page.params.idAtividade);
	let idEtapa = $derived($page.params.idEtapa);
	let status, corStatus;
	let listaComentarios = $derived(comentarios);
	let alunoParaAvaliar = null;

	
	
	
	

	async function calculaStatusEntrega() {
		if (data.entrega.avaliada) {
			status = STATUS_ENTREGA['2'];
			corStatus = 'lightgreen';
		} else if (data.entrega.anexos.length > 0) {
			status = STATUS_ENTREGA['1'];
		} else {
			status = STATUS_ENTREGA['0'];
		}
	}

	function onClickIntegrante(id) {
		alunoParaAvaliar = id;
		const url = $page.url.pathname + '/' + id;
		goto(url);
	}

	onMount(async () => {
		await fetchComentarios(data.entrega.id);
		await calculaStatusEntrega();

		if (data.toast === 'avaliacao_atualizada') {
			toast.success('Avaliação editada com sucesso!');
			data.toast = '';
		}

		if (data.toast === 'avaliacao_realizada') {
			toast.success('Avaliação realizada com sucesso!');
			data.toast = '';
		}
	});
</script>

<Toaster richColors position="top-center" closeButton />
<div class="content-etapa">
	<div class="page-info-container">
		<div class="page-info-header">
			<h1>{data.etapa.titulo}</h1>
			<h3>{data.atividade.titulo}</h3>
		</div>
		<br />
		<br />
		<h2>Escolha um integrante para avaliar:</h2>
		<div class="container-integrantes">
			<div class="integrantes">
				{#if data.etapa.grupo.integrantes && data.etapa.grupo.integrantes.length == 0}
					<p>(Não há integrantes para avaliar)</p>
				{:else}
					{#each data.etapa.grupo.integrantes as integrante}
						<CardIntegrante {integrante} on:click={() => onClickIntegrante(integrante?.id)} />
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style scoped>
	.content-etapa {
		width: 100%;
		display: flex;
		padding-top: 64px;
	}

	.page-info-header {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
		justify-content: space-between;
		align-items: center;
		background-color: lightgray;
	}

	.page-info-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-bottom: 8px;
		justify-content: space-between;
		align-items: center;
	}

	.integrantes {
		margin-top: 36px;
		display: flex;
		flex-direction: column;
		align-items: left;
	}
</style>
