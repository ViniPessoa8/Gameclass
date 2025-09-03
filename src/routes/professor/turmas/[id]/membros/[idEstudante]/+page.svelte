<script>
	import { Toaster, toast } from 'svelte-sonner';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CardTurma from '$lib/components/CardTurma.svelte';
	import icon_relatorio from '$lib/assets/icon_relatorio.png';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const estudante = data.estudante;
	const turma = data.turma;
	const outras_turmas = data.outras_turmas;

	function onClick() {
		const url = `/professor/turmas/${turma.id}/membros/${estudante.id}/boletim`;
		goto(url);
	}

	onMount(() => {
		console.debug('conquistas => ', estudante.conquistas);
	});
</script>

<Toaster richColors position="top-center" closeButton />
<div class="container">
	<div class="content-estudante">
		<div class="estudante-nome-login">
			<h1>{estudante.login}</h1>
			<h3>{estudante.nome}</h3>
		</div>

		<ProgressBar
			currentLevel={estudante.nivel}
			currentXp={estudante.acumulo_xp}
			xpForCurrentLevel={Math.trunc(estudante.acumulo_xp / 100) * 100}
			xpForNextLevel={Math.trunc(estudante.acumulo_xp / 100) * 100 + 100}
		/>

		<div class="button-container">
			<Button on:click={onClick}
				><img src={icon_relatorio} alt="icone boletim" /> Ver Boletim</Button
			>
		</div>

		<div class="descricao-estudante">
			<h2>Descrição</h2>
			<p>{estudante.bio}</p>
		</div>

		<hr style="border-color:var(--cor-primaria); width:100%" />

		<div class="outras-turmas-container">
			<h2>Outras turmas do estudante em que você é professor</h2>
			<div class="outras-turmas">
				{#if outras_turmas.length != 0}
					{#each outras_turmas as turma}
						<CardTurma
							nome={turma.nome}
							disciplina={turma.disciplina}
							ano={turma.ano}
							idTurma={turma.id}
						/>
					{/each}
				{:else}
					<p>(Não há outras turmas para exibir)</p>
				{/if}
			</div>
		</div>
	</div>
	<div class="conquistas-container">
		<div class="conquistas-header">
			<h2>Conquistas</h2>
		</div>
		<div class="conquistas-content">
			{#if estudante.conquistas.length > 0}
				{#each estudante.conquistas as conquista}
					<hr width="100px" style:border-top="1px solid grey" style:align-self="center" />
					<div class="conquista">
						<div class="conquista-emblema">
							<img src={conquista.emblema_url} alt="emblema da conquista" width="128" />
						</div>
						<div class="conquista-info-container">
							<p class="conquista-nome">{conquista.nome}</p>
							<p class="conquista-descricao">{conquista.descricao}</p>
							<p class="conquista-xp">{conquista.pontos_xp} XP</p>
						</div>
					</div>
				{/each}
			{:else}
				<h3>Estudante não possui conquistas</h3>
			{/if}
		</div>
	</div>
</div>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
	}

	.content-estudante {
		flex: 2;
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

	.estudante-nome-login {
		display: flex;
		flex-direction: row;
		gap: 12px;
		align-items: end;
		align-self: start;
	}

	.estudante-nome-login > h3 {
		font-weight: 500;
	}

	.outras-turmas-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.outras-turmas {
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
	}

	.conquistas-container {
		flex: 1;
		border-left: 1px solid black;
		border-bottom: 1px solid black;
		border-bottom-left-radius: 24px;
		padding: 24px;
		min-height: 60vh;
	}

	.conquistas-content {
		display: flex;
		flex-direction: column;
		margin-top: 24px;
		gap: 18px;
	}

	.conquistas-header h2 {
		text-align: center;
		font-size: 36px;
	}

	.conquista {
		display: flex;
		flex-direction: row;
	}

	.conquista-info-container {
		display: flex;
		flex-direction: column;
		padding: 12px;
	}

	.conquista-nome {
		font-weight: 600;
		font-size: 24px;
	}

	.conquista-emblema {
		align-self: center;
	}

	.conquista-emblema img {
		align-self: center;
		justify-self: center;
		border-radius: 64px;
	}

	.conquista-xp {
		font-weight: 500;
		font-size: 18px;
		margin-top: auto;
		justify-self: end;
	}

	.conquista-descricao {
		font-weight: 300;
		font-size: 20px;
	}
</style>
