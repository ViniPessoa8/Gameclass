<script>
	import { Toaster, toast } from 'svelte-sonner';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CardItemPendente from '$lib/components/CardItemPendente.svelte';
	import icon_relatorio from '$lib/assets/icon_relatorio.png';
	import { goto } from '$app/navigation';
	import CircularIcon from '$lib/components/CircularIcon.svelte';

	let { data } = $props();

	const usuario = data.usuario;
	const itensPendentes = data.itensPendentes;

	function onClick() {
		const url = `/professor/turmas/${turma.id}/membros/${estudante.id}/boletim`;
		goto(url);
	}

	onMount(() => {});
</script>

<Toaster richColors position="top-center" closeButton />
<div class="content-estudante">
	<div class="estudante-nome">
		<CircularIcon
			type="text"
			backgroundColor={'#' + data.usuario.cor}
			text={data.usuario.login[0].toUpperCase()}
		/>
		<div class="estudante-nome-login">
			<h3 class="login">{usuario.login}</h3>
			<h3 class="nome">{usuario.nome}</h3>
		</div>
	</div>

	<div class="descricao-estudante">
		<h2>Descrição</h2>
		<p>{usuario.bio}</p>
	</div>

	<hr style="border-color:var(--cor-primaria); width:100%" />

	<div class="itens-pendentes-container">
		<h2>Turmas com pendências</h2>
		<div class="itens-pendentes">
			{#if itensPendentes.length != 0}
				{#each itensPendentes as item}
					<CardItemPendente
						nome={item.titulo}
						disciplina={item.nome_turma}
						pendencias={item.pendencias}
						idTurma={item.id_turma}
						idAtividade={item.id_atividade}
						idItemAtividade={item.id}
					/>
				{/each}
			{:else}
				<p>(Não há outras turmas para exibir)</p>
			{/if}
		</div>
	</div>
</div>

<style scoped>
	.content-estudante {
		justify-self: center;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 24px;
		gap: 24px;
		padding: 24px 128px;
	}

	.button-container {
		align-self: end;
	}

	.descricao-estudante {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.estudante-nome {
		display: flex;
		gap: 12px;
		align-items: center;
		align-self: start;
	}

	.estudante-nome-login {
		display: flex;
		flex-direction: row;
		gap: 12px;
		align-items: end;
	}

	.login {
		font-weight: 800;
		font-size: 32px;
	}

	.nome {
		font-weight: 500;
		margin-bottom: 4px;
	}

	.itens-pendentes-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.itens-pendentes {
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
	}
</style>
