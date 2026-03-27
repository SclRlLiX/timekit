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

    /* Target the hidden WebKit wrapper to force centering */
    input[type="time"]::-webkit-datetime-edit {
        display: flex;
        justify-content: center;
        align-items: center;
        /* The clock icon on the right takes up roughly 24px of space.
           Adding a bit of padding to the left balances the container
           so the time text appears perfectly centered in the whole box.
        */
        padding-left: 1.5rem; 
    }
</style>