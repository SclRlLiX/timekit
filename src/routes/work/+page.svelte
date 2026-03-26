<script lang="ts">
	import { fade } from 'svelte/transition';

	let activeTab = $state('Work Time');
	const tabs = ['Work Time', 'Work Start', 'Work End'];

	// Automatically updates when activeTab changes
	let activeIndex = $derived(tabs.indexOf(activeTab));
</script>

<h1>Work Page</h1>

<div class="relative flex w-full rounded-xl bg-(--color-surface) p-2">
	<div class="pointer-events-none absolute inset-1 flex">
		<div
			class="w-1/3 rounded-lg bg-(--color-surface-raised) shadow-sm transition-all duration-400 ease-out"
			style="transform: translateX({activeIndex * 100}%);"
		></div>
	</div>
	{#each tabs as tab (tab)}
		<button
			onclick={() => (activeTab = tab)}
			class="relative z-10 text-md flex-1 px-5 py-3 font-medium transition-all duration-400 rounded-lg
			{activeTab === tab
				? 'text-(--color-accent)'
				: 'text-(--color-muted)'}"
		>
			{tab}
		</button>
	{/each}
</div>

<div class="grid px-2 py-6">
	{#key activeTab}
		<div transition:fade={{ duration: 200 }} class="col-start-1 row-start-1">
			<p class="text-zinc-600 dark:text-zinc-400">Content for {activeTab}</p>
		</div>
	{/key}
</div>
