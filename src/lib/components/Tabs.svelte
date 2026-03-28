<script lang="ts">
	// Using Svelte 5 runes for props

	let {
		activeTab = $bindable(''),
		tabs = ['Work Time', 'Work Start', 'Work End']
	} = $props();

    let activeIndex = $derived(tabs.indexOf(activeTab));

</script>


<div class="relative flex w-full rounded-xl bg-(--color-surface) p-1 drop-shadow-md">
	<div class="pointer-events-none absolute inset-1 flex">
		<div
			class="w-1/{tabs.length} rounded-lg bg-(--color-accent-subtle) shadow-sm transition-all duration-400 ease-out"
			style="transform: translateX({activeIndex * 100}%);"
		></div>
	</div>
	{#each tabs as tab (tab)}
		<button
			onclick={() => (activeTab = tab)}
			class="text-md relative z-10 flex-1 rounded-lg px-5 py-3 transition-all duration-400
			{activeTab === tab ? 'font-bold text-(--color-accent)' : 'text-(--color-muted)'}"
		>
			{tab}
		</button>
	{/each}
</div>