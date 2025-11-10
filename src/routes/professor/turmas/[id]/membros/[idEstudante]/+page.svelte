<script>
	import { Toaster, toast } from 'svelte-sonner';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import CardTurma from '$lib/components/CardTurma.svelte';
	import IconeInformacao from '$lib/components/IconeInformacao.svelte';
	import icon_relatorio from '$lib/assets/icon_relatorio.png';
	import { goto } from '$app/navigation';
	import CircularTextIcon from '$lib/components/CircularTextIcon.svelte';
	import { log, debug } from '$lib/utils/logger';

	let { data } = $props();

	const estudante = data.estudante;
	const turma = data.turma;
	const outras_turmas = data.outras_turmas;

	function onClick() {
		const url = `/professor/turmas/${turma.id}/membros/${estudante.id}/boletim`;
		goto(url);
	}

	function formatarDataUTC(isoUTC) {
		const data = new Date(isoUTC);
		return data.toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			timeZone: 'UTC' // Garante que a data seja interpretada como UTC
		});
	}

	onMount(() => {
		debug('conquistas => ', estudante.conquistas);
	});
</script>

<Toaster richColors position="top-center" closeButton />
<div class="container">
	<div class="content-estudante">
		<div class="estudante-nome-login">
			<CircularTextIcon backgroundColor="#{estudante.cor}">{estudante.nome[0]}</CircularTextIcon>
			<h1>{estudante.login}</h1>
			<h3>{estudante.nome}</h3>
		</div>
		<div class="estudante-info">
			{#if estudante.dtNasc != undefined}
				<p>Data de Nascimento: <b>{formatarDataUTC(estudante.dtNasc)}</b></p>
			{/if}
			<p>Email: <b>{estudante.email}</b></p>
			<p>Matrícula: <b>{estudante.matricula}</b></p>
			<p>Último acesso: <b>{formatarDataUTC(estudante.ultimo_acesso)}</b></p>
		</div>

		<div class="barra-pontos">
			<ProgressBar
				currentLevel={estudante.nivel}
				currentPoints={estudante.acumulo_pontos}
				pointsForCurrentLevel={Math.trunc(estudante.acumulo_pontos / 100) * 100}
				pointsForNextLevel={Math.trunc(estudante.acumulo_pontos / 100) * 100 + 100}
			/>

			<IconeInformacao
				text="Estudantes adiquirem pontos por meio de ações como: realizar comentários, entregar atividades, tirar notas boas, etc. Os pontos adiquiridos em cada atividade são acumulados."
			/>
		</div>

		<div class="button-container">
			<Button on:click={onClick}
				><div class="button-content">
					<img src={icon_relatorio} alt="icone boletim" />
					<p>Ver Boletim</p>
				</div></Button
			>
		</div>

		<div class="descricao-estudante">
			<h2>Bio</h2>
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
			<h2>Conquistas nessa turma</h2>
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
							<p class="conquista-pontos">{conquista.pontos}</p>
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
		align-self: start;
		margin-bottom: 36px;
	}

	.button-content {
		display: flex;
		flex-direction: row;
		gap: 8px;
		align-items: center;
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

	.estudante-info {
		width: 100%;
		font-size: 18px;
	}

	.outras-turmas-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.outras-turmas {
		justify-content: start;
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
		font-size: 30px;
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

	.conquista-pontos {
		font-weight: 500;
		font-size: 18px;
		margin-top: auto;
		justify-self: end;
	}

	.conquista-descricao {
		font-weight: 300;
		font-size: 20px;
	}

	.barra-pontos {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
	}
</style>
