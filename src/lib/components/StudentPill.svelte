<script>
	import { createEventDispatcher } from 'svelte';

	
	/**
	 * @typedef {Object} Props
	 * @property {{id: string, nome: string}} student
	 */

	/** @type {Props} */
	let { student } = $props();

	const dispatch = createEventDispatcher();

	function remove() {
		dispatch('remove', { studentId: student.id });
	}
</script>

<div class="student-pill" title={student.nome}>
	<span class="student-name">{student.nome}</span>
	<button class="remove-btn" onclick={remove} aria-label="Remover {student.nome}">×</button>
</div>

<style>
	.student-pill {
		display: flex;
		align-items: center;
		gap: 8px;
		background-color: #eef2ff; /* Cor indigo-100 */
		color: var(--cor-primaria); /* Cor indigo-700 */
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 500;
		animation: pop-in 0.2s ease-out;
	}
	.student-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.remove-btn {
		cursor: pointer;
		background: var(--cor-secundaria); /* Cor indigo-600 */
		color: white;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		line-height: 1;
		transition: background-color 0.2s;
	}
	.remove-btn:hover {
		background: #3730a3; /* Cor indigo-800 */
	}
	@keyframes pop-in {
		from {
			transform: scale(0.8);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
