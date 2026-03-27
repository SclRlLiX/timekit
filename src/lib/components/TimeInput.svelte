<script lang="ts">
    // Using Svelte 5 runes for props
    let {
        label = "Work Start",
        id = "work-start",
        // $bindable allows two-way binding from the parent component
        value = $bindable("") 
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
            bg-(--color-surface) px-4 py-3 
            text-(--color-main-text) shadow-sm outline-none 
            transition-all duration-300 ease-in-out
            focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent)
        "
    />
</div>

<style>
    :global(.dark) input[type="time"] {
        color-scheme: dark;
    }

    /* 1. Hide the native clock icon that throws off the math */
    input[type="time"]::-webkit-calendar-picker-indicator {
        display: none;
        margin: 0;
    }

    /* 2. Force the inner text wrapper to center perfectly */
    input[type="time"]::-webkit-datetime-edit {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0; /* This removes the offset! */
    }
</style>