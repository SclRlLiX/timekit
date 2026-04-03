<script lang="ts">
	import { activeSection } from '$lib/activeSection';
	import WorkPage from '$lib/components/Pages/WorkPage.svelte';
	import SleepPage from '$lib/components/Pages/SleepPage.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="relative">
  {#key $activeSection}
    <div transition:fade={{ duration:200 }} class="absolute inset-0">
      {#if $activeSection === 'work'}
        <WorkPage />
      {:else}
        <SleepPage />
      {/if}
    </div>
  {/key}
</div>