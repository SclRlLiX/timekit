<script lang="ts">
	// Using Svelte 5 runes for props

	let {
		activeTab = $bindable(''),
		tabs = ['Work Time', 'Work Start', 'Work End']
	} = $props();

    let activeIndex = $derived(tabs.indexOf(activeTab));

</script>


<div class="relative flex w-full rounded-full bg-(--color-surface) p-1 drop-shadow-sm">
	<div class="pointer-events-none absolute inset-1 flex">
		<div
			class="rounded-full bg-(--color-accent-subtle)/70 backdrop-blur-md shadow-sm transition-transform ease-in-out duration-500"
			style="width: {100 / tabs.length}%; transform: translateX({activeIndex * 100}%);"
		></div>
	</div>
	{#each tabs as tab (tab)}
		<button
			onclick={() => (activeTab = tab)}
			class="text-md relative z-10 flex-1 rounded-lg px-5 py-3
			{activeTab === tab ? 'font-bold text-(--color-accent)' : 'text-(--color-muted)'}"
		>
			{tab}
		</button>
	{/each}
</div>