<script>
	import Button from '$lib/components/Button.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	const { data } = $props();

	let etapasSessionStorage;
	let etapasString = $state('');

	$effect.pre(() => {
		etapasSessionStorage = JSON.parse(sessionStorage.getItem('etapas'));
		if (etapasSessionStorage) {
			data.etapas = etapasSessionStorage;
			etapasString = JSON.stringify(data.etapas);
		} else {
			goto(`/professor/turmas/${$page.params.id}/atividades`);
		}
	});
</script>

<form
	class="content-etapa"
	method="POST"
	use:enhance={() => {
		return async ({ update }) => {
			sessionStorage.removeItem('etapas');
			update();
		};
	}}
>
	<input name="etapas" bind:value={etapasString} type="hidden" />
	<h1><u>Resumo de critérios para avaliação da atividade</u></h1>
	<h2>{data.atividade.titulo}</h2>
	<div class="info-container"></div>
	<h2>Critérios</h2>
	<div class="container-etapas">
		{#if data.etapas}
			{#each data.etapas as etapa}
				<div class="container-etapa">
					<div class="header-etapa">
						<h3 class="titulo-etapa">{etapa.titulo}</h3>
						<h3 class="realizacao-etapa">(Avaliação: {etapa.realizacaoGroup})</h3>
					</div>
					<div class="criterio-container">
						<p class="titulo-criterio"><b>Título</b></p>
						<p class="descricao-criterio"><b>Descrição</b></p>
						<p class="nota-criterio"><b>Nota</b></p>
					</div>
					{#each etapa.criterios as criterio}
						<div class="criterio-container">
							<p class="titulo-criterio">{criterio.titulo}</p>
							<p class="descricao-criterio">{criterio.descricao}</p>
							<p class="nota-criterio">{criterio.nota_max}</p>
						</div>
					{/each}
					<p class="nota-total">
						Nota total: {etapa.criterios.reduce((previous, current) => {
							return previous + parseFloat(current.nota_max);
						}, 0)}
					</p>
				</div>
			{/each}
		{:else}
			<p>Sem etapas a serem mostradas</p>
		{/if}
	</div>
	<div class="botoes">
		<Button
			on:click={() => {
				const novaUrl = $page.url.href.replace(/\/[^\/]*$/, '');
				goto(novaUrl);
			}}>Voltar</Button
		>
		<Button backgroundColor="var(--cor-primaria)" color="white" type="submit">Salvar etapas</Button>
	</div>
</form>

<style scoped>
	.content-etapa {
		display: flex;
		flex-direction: column;
		text-align: center;
		padding-top: 126px;
		padding-left: 96px;
		padding-right: 96px;
	}

	.content-etapa > h1 {
		margin-bottom: 12px;
	}

	.content-etapa > h2 {
		margin-bottom: 36px;
	}

	.content-etapa > h2 {
		margin-bottom: 24px;
	}

	.container-etapa {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin: 0px 300px;
		margin-bottom: 16px;
	}

	.header-etapa {
		margin-bottom: 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.titulo-etapa {
		font-size: 28px;
	}

	.realizacao-etapa {
		margin-left: 12px;
	}

	.criterio-container {
		display: grid;
		grid-template-columns: 1fr 2fr 50px;
		gap: 24px;
		font-size: 20px;
		margin-left: 12px;
		padding: 6px 0px;
		border-bottom: 1px solid black;
	}

	.nota-total {
		margin-top: 6px;
		font-size: 20px;
		font-weight: 600;
		text-align: right;
	}

	.botoes {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 24px;
	}
</style>
