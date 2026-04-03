<script lang="ts">
	// Using Svelte 5 runes for props
	let {
		label = 'Work Start Time',
		hours = 0,
		mins = 0,
	} = $props();
</script>

<div
	class="flex flex-col items-center justify-center rounded-4xl border border-(--color-accent)/80 bg-(--color-accent-subtle) py-6 drop-shadow-md"
>
	<h2 class="mb-2 text-sm font-medium tracking-wider text-(--color-muted) uppercase">
		{label}
	</h2>
	<div class="text-5xl font-bold text-(--color-accent) tabular-nums">
		{hours.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}
	</div>
</div>
