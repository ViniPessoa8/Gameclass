<script>
	import GroupCard from '$lib/components/GroupCard.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	// Estados reativos
	let groups = data.groups;
	let allStudents = data.students;
	let unassignedStudents = [];

	// Função para calcular os alunos não alocados
	function calculateUnassigned() {
		const assignedIds = new Set();
		groups.forEach((g) => g.integrantes.forEach((i) => assignedIds.add(i.id)));
		unassignedStudents = allStudents.filter((s) => !assignedIds.has(s.id));
	}

	// Recalcula sempre que os grupos mudarem
	$: calculateUnassigned(groups);

	function handleAddStudent(event) {
		const { studentId, groupId } = event.detail;
		const studentToAdd = unassignedStudents.find((s) => s.id === studentId);

		if (studentToAdd) {
			groups = groups.map((g) => {
				if (g.id === groupId) {
					// Adiciona o aluno ao novo grupo
					return { ...g, integrantes: [...g.integrantes, studentToAdd] };
				}
				return g;
			});
		}
	}

	function handleRemoveStudent(event) {
		const { studentId, groupId } = event.detail;
		let studentToMove;

		groups = groups.map((g) => {
			if (g.id === groupId) {
				studentToMove = g.integrantes.find((s) => s.id === studentId);
				// Remove o aluno do grupo
				return { ...g, integrantes: g.integrantes.filter((s) => s.id !== studentId) };
			}
			return g;
		});
	}

	async function saveChanges() {
		// TODO: Implementar a lógica de salvamento
		// Aqui você enviaria a estrutura `groups` para um endpoint da API
		// que atualizaria as tabelas `integrante_grupo_de_alunos`.
		console.log('Salvando alterações:', groups);
		alert('Grupos salvos! (Ver console para detalhes)');
	}
</script>

<div class="page-container">
	<div class="header">
		<h1>Definir integrantes dos grupos</h1>
		<p>{data.activity.title}</p>
	</div>

	<div class="groups-grid">
		{#each groups as group (group.id)}
			<GroupCard
				{group}
				{unassignedStudents}
				on:add={handleAddStudent}
				on:remove={handleRemoveStudent}
			/>
		{/each}
	</div>

	<div class="actions">
		<Button color="var(--text-1)" backgroundColor="var(--cor-primaria)" on:click={saveChanges}
			>Definir Grupos</Button
		>
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
