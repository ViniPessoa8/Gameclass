<script>
	import { createEventDispatcher } from 'svelte';
	import StudentPill from '$lib/components/StudentPill.svelte';

	/** @type {{id: string, nome: string, integrantes: any[]}} */
	export let group;
	/** @type {any[]} */
	export let unassignedStudents;

	let searchTerm = '';
	let showSuggestions = false;
	let inputFocused = false;

	const dispatch = createEventDispatcher();

	$: suggestedStudents = searchTerm
		? unassignedStudents
				.filter((student) => student.nome.toLowerCase().includes(searchTerm.toLowerCase()))
				.slice(0, 5) // Limita a 5 sugestões
		: [];

	function addStudent(student) {
		dispatch('add', { studentId: student.id, groupId: group.id });
		searchTerm = '';
		showSuggestions = false;
	}

	function handleFocus() {
		inputFocused = true;
		showSuggestions = true;
	}

	function handleBlur() {
		inputFocused = false;
		// Atraso para permitir o clique na sugestão
		setTimeout(() => {
			if (!inputFocused) showSuggestions = false;
		}, 150);
	}
</script>

<div class="group-card">
	<div class="group-header">
		<h2>{group.nome} ({group.integrantes.length})</h2>
		<p>Alunos 0 / x</p>
	</div>

	<div class="search-container">
		<input
			type="text"
			class="search-input"
			placeholder="Pesquisar e adicionar aluno..."
			bind:value={searchTerm}
			on:focus={handleFocus}
			on:blur={handleBlur}
			on:input={() => (showSuggestions = true)}
		/>

		{#if showSuggestions && suggestedStudents.length > 0}
			<ul class="suggestions-list">
				{#each suggestedStudents as student (student.id)}
					<li
						on:mousedown={() => addStudent(student)}
						on:keydown={(e) => e.key === 'Enter' && addStudent(student)}
						tabindex="0"
					>
						{student.nome}
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<div class="members-list">
		{#each group.integrantes as student (student.id)}
			<StudentPill
				{student}
				on:remove={(e) => dispatch('remove', { studentId: e.detail.studentId, groupId: group.id })}
			/>
		{:else}
			<p class="empty-text">Pesquise os estudantes acima para formar o grupo.</p>
		{/each}
	</div>
</div>

<style>
	/* Estilos similares ao do mockup HTML */
	.group-card {
		background-color: white;
		border-radius: 12px;
		padding: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.group-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.group-header > h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		padding-bottom: 10px;
		border-bottom: 1px solid #eee;
	}
	.search-container {
		position: relative;
	}
	.search-input {
		width: 100%;
		padding: 10px 12px;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-size: 14px;
		box-sizing: border-box;
	}
	.suggestions-list {
		position: absolute;
		background: white;
		width: 100%;
		list-style: none;
		margin: 5px 0 0;
		padding: 0;
		border: 1px solid #ddd;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		z-index: 10;
		max-height: 200px;
		overflow-y: auto;
	}
	.suggestions-list li {
		padding: 10px 15px;
		cursor: pointer;
	}
	.suggestions-list li:hover {
		background-color: #f5f5f5;
	}
	.members-list {
		min-height: 50px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding-top: 5px;
	}
	.empty-text {
		color: #999;
		font-size: 14px;
		margin: auto;
	}
</style>
