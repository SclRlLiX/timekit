<script>
	let { children } = $props();
</script>

<div class="card mb-7 rounded-xl border bg-(--color-surface) border-(--color-surface-raised) drop-shadow-md">
	{#if children}
		{@render children()}
	{/if}
</div>
