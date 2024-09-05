<script>
	import { page } from '$app/stores';
	import TurmaTabBar from '$lib/components/TurmaTabBar.svelte';
	let id = $page.params.id;

	console.log('TURMAS/ID DATA:', id);
</script>

<TurmaTabBar />
