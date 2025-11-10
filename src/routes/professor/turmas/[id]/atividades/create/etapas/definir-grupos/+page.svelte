<script>
	import { toast, Toaster } from 'svelte-sonner';
	import GroupCard from '$lib/components/GroupCard.svelte';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { debug } from '$lib/utils/logger';

	/**
	 * @typedef {Object} Props
	 * @property {import('./$types').PageData} data
	 */

	/** @type {Props} */
	let { data } = $props();

	// Estados reativos
	let grupos = $state(data.groups);
	let estudantesTurma = data.estudantes;
	let estudantesSemGrupo = $state([]);

	// Função para calcular os alunos não alocados
	function calculateUnassigned() {
		const idsAlunosComGrupo = new Set();
		grupos.forEach((g) => g.integrantes.forEach((i) => idsAlunosComGrupo.add(i.id)));
		estudantesSemGrupo = estudantesTurma.filter((s) => !idsAlunosComGrupo.has(s.id));
	}

	// Recalcula sempre que os grupos mudarem
	$effect(() => {
		calculateUnassigned(grupos);
	});

	function handleAddStudent(event) {
		const { studentId, groupId } = event.detail;
		const estudanteNovo = estudantesSemGrupo.find((s) => s.id === studentId);

		if (estudanteNovo) {
			grupos = grupos.map((g) => {
				if (g.id === groupId) {
					// Adiciona o aluno ao novo grupo
					return { ...g, integrantes: [...g.integrantes, estudanteNovo] };
				}
				return g;
			});
		}
		sessionStorage.setItem('grupos', JSON.stringify(grupos));
	}

	function handleRemoveStudent(event) {
		const { studentId, groupId } = event.detail;
		let studentToMove;

		grupos = grupos.map((g) => {
			if (g.id === groupId) {
				studentToMove = g.integrantes.find((s) => s.id === studentId);
				// Remove o aluno do grupo
				return { ...g, integrantes: g.integrantes.filter((s) => s.id !== studentId) };
			}
			return g;
		});
	}

	onMount(() => {
		const gruposSessionStorage = sessionStorage.getItem('grupos');
		if (gruposSessionStorage) {
			grupos = JSON.parse(gruposSessionStorage);
		}
	});
</script>

<Toaster richColors expand position="top-center" closeButton />
<div class="page-container">
	<div class="header">
		<h1>Definir integrantes dos grupos</h1>
		<p>{data.activity.title}</p>
	</div>

	<div class="groups-grid">
		{#each grupos as group (group.id)}
			<GroupCard
				{group}
				{estudantesSemGrupo}
				on:add={handleAddStudent}
				on:remove={handleRemoveStudent}
			/>
		{/each}
	</div>

	<div class="actions">
		<form
			method="POST"
			class="button-definir"
			use:enhance={({ cancel }) => {
				if (estudantesSemGrupo.length > 0) {
					toast.error('Existem alunos sem grupo. Por favor, aloque todos os alunos.');
					cancel();
					return;
				}

				sessionStorage.setItem('grupos', JSON.stringify(grupos));
			}}
		>
			<input type="hidden" name="grupos" value={JSON.stringify(grupos)} />
			<Button type="submit" color="var(--text-1)" backgroundColor="var(--cor-primaria)"
				>Definir Grupos</Button
			>
		</form>
	</div>
</div>

<style>
	.page-container {
		padding: 64px 256px;
		max-width: 1400px;
		margin: auto;
	}
	.header {
		margin-bottom: 30px;
	}
	.header h1 {
		font-size: 28px;
		font-weight: 600;
		color: #1a2c42;
	}
	.header p {
		font-size: 18px;
		color: #555;
	}
	.groups-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 25px;
	}
	.actions {
		margin-top: 40px;
		display: flex;
		justify-content: flex-end;
	}
	.save-button {
		background-color: #1d4ed8; /* blue-700 */
		color: white;
		font-weight: 600;
		padding: 12px 24px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.save-button:hover {
		background-color: #1e40af; /* blue-800 */
	}
</style>
