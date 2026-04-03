<script>
	let { children } = $props();
</script>

<div
	class="card mb-7 rounded-4xl border border-(--color-surface-raised) bg-(--color-surface) drop-shadow-sm"
>
	<div class="will-change-opacity col-start-1 row-start-1">
		<div class="space-y-10 p-6">
			<div class="mx-auto max-w-md space-y-6">
				{#if children}
					{@render children()}
				{/if}
			</div>
		</div>
	</div>
</div>
