<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [visible]
	 * @property {string} [title]
	 * @property {string} [message]
	 * @property {any} [buttons] - [{ label: 'Ok', onClick: fn, color: 'blue' }]
	 */

	/** @type {Props} */
	let { visible = false, title = '', message = '', buttons = [] } = $props();

	if (buttons.length < 1 || buttons.length > 3) {
		throw new Error('O modal deve ter entre 1 e 3 botões.');
	}
</script>

{#if visible}
	<div class="overlay">
		<div class="modal">
			{#if title}
				<h2>{title}</h2>
			{/if}
			<p>{message}</p>

			<div class="buttons">
				{#each buttons as button, index (index)}
					<button
						id="btn-{index}"
						class="btn"
						style="background-color: {button.color || 'gray'}"
						onclick={button.onClick}
					>
						{button.label}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		min-width: 300px;
		max-width: 90vw;
		text-align: center;
	}

	.buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1rem;
	}

	.btn {
		padding: 0.5rem 1rem;
		border: none;
		color: white;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
