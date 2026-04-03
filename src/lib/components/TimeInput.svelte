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
	<label for={id}>
		{label}
	</label>

	<input
		type="time"
		{id}
		bind:value
		class="
            w-full rounded-2xl border border-(--color-surface-raised)/70
            bg-(--color-surface-raised)/25 py-3
            text-(--color-main-text) transition-all
            duration-300 ease-in-out outline-none
            focus:border-(--color-accent)/70 focus:ring-2 focus:ring-(--color-accent)/50
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
