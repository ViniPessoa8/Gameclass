<script>
	import CircularTextIcon from './CircularTextIcon.svelte';

	export let acronym, color;

	// TODO: onHover feedback
</script>

<div class="turma">
	<CircularTextIcon backgroundColor={color}>{acronym}</CircularTextIcon>
	<h1><slot></slot></h1>
</div>

<style>
	.turma {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 5px;
	}

	.turma > h1 {
		font-size: 20px;
	}
</style>

