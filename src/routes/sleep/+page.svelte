<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { activeSection } from '$lib/activeSection';
	import { resolve } from '$app/paths';

	onMount(() => {
		activeSection.set('sleep');
		goto(resolve('/'));
	});
</script>
