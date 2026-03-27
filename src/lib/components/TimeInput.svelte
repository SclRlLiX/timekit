<script lang="ts">
	// Using Svelte 5 runes for props
	let {
		label = 'Work Start',
		id = 'work-start',
		// $bindable allows two-way binding from the parent component
		value = $bindable('')
	} = $props();
</script>

<div class="flex flex-col gap-2">
	<label for={id} class="text-sm font-medium text-(--color-main-text)">
		{label}
	</label>

	<input
		type="time"
		{id}
		bind:value
		class="
            w-full rounded-xl border-2 border-(--color-surface-raised)
            bg-(--color-surface) py-3
            text-(--color-main-text) shadow-sm transition-all
            duration-300 ease-in-out outline-none
            focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)
        "
	/>
</div>

<style>
	:global(.dark) input[type='time'] {
		color-scheme: dark;
	}

	input[type='time'] {
		text-align: center;
	}

	/* 1. Hide the clock icon completely */
	input[type='time']::-webkit-calendar-picker-indicator {
		display: none;
		-webkit-appearance: none;
		margin: 0;
	}

	/* 2. Target the main inner wrapper */
	input[type='time']::-webkit-datetime-edit {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0;
	}

	/* 3. Target the specific Safari text fields wrapper */
	input[type='time']::-webkit-datetime-edit-fields-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0;
	}

	/* 4. Force text alignment on the value itself (iOS specific) */
	input[type='time']::-webkit-date-and-time-value {
		text-align: center;
	}
</style>
