<script>
	import { goto } from '$app/navigation';
	import { historyStack } from '$src/stores/history.js';
	import { navigationGuard } from '$src/stores/navigationGuard.js';
	import { get } from 'svelte/store';
	import Button from './Button.svelte';

	function performNavigation() {
		const previousPage = $historyStack[$historyStack.length - 2];
		historyStack.set($historyStack);

		if (previousPage) {
			goto(previousPage, { replaceState: true });
		} else {
			goto('/', { replaceState: true });
		}
	}

	async function goBack() {
		const guard = get(navigationGuard);

		if (typeof guard === 'function') {
			const isConfirmed = await guard();

			if (!isConfirmed) {
				return;
			}
		}
		navigationGuard.set(null);

		performNavigation();
	}

	let showButton = $derived($historyStack.length > 1);
</script>

{#if showButton}
	<div class="button-container">
		<Button backgroundColor="var(--cor-primaria)" color="white" on:click={goBack}>{'<-'}</Button>
	</div>
{/if}

<style>
	.button-container {
		position: absolute;
		margin: 20px;
	}
</style>
