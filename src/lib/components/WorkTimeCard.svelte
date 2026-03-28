<script>
	let { children } = $props();
</script>

<div class="card rounded-xl border-2 bg-(--color-surface) border-(--color-surface-raised) drop-shadow-md">
	{#if children}
		{@render children()}
	{/if}
</div>
