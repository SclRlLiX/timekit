<script>
	let { children } = $props();
</script>

<div class="card mb-7 rounded-4xl border bg-(--color-surface) border-(--color-surface-raised) drop-shadow-sm">
	{#if children}
		{@render children()}
	{/if}
</div>
