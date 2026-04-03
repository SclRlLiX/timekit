<script lang="ts">
	import { activeSection } from '$lib/activeSection';
    import WorkPage from '$lib/components/Pages/WorkPage.svelte'
    import SleepPage from '$lib/components/Pages/SleepPage.svelte';
</script>

{#if $activeSection === 'work'}
	<WorkPage/>
{:else}
	<SleepPage/>
{/if}
