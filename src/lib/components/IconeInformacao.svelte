<script>
	import icon_info from '$lib/assets/icon_info.png';
	import { Tooltip } from '@svelte-plugins/tooltips';

	export let text, alt;
</script>

<Tooltip content={text} style={{ backgroundColor: 'var(--cor-primaria)' }}>
	<img src={icon_info} {alt} />
</Tooltip>
