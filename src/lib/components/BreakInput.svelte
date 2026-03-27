<script lang="ts">
    let {
        label = "Break (minutes)",
        id = "break-time",
        value = $bindable(30),
        min = 0,
        max = 300, // Reasonable max break (5 hours)
        step = 5   // Button clicks change it by 5 mins, typing allows 1 min
    } = $props();

    function decrement() {
        if (value > min) value = Math.max(min, value - step);
    }

    function increment() {
        if (value < max) value = Math.min(max, value + step);
    }
</script>

<div class="flex flex-col gap-2">
    <label for={id} class="text-sm font-medium text-(--color-main-text)">
        {label}
    </label>
    
    <div class="
        flex items-center overflow-hidden rounded-xl border-2
        border-(--color-surface-raised) bg-(--color-surface) shadow-sm 
        transition-all duration-300 ease-in-out 
        focus-within:border-(--color-accent) focus-within:ring-1 focus-within:ring-(--color-accent)
    ">
        
        <button 
            type="button" 
            onclick={decrement}
            class="flex h-12 w-14 items-center justify-center text-(--color-muted) transition-colors hover:text-(--color-accent) hover:bg-(--color-accent-subtle) active:bg-(--color-surface-raised)"
            aria-label="Decrease break time"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>

        <input
            type="number"
            {id}
            bind:value
            {min}
            {max}
            class="
                h-12 w-full bg-transparent text-center font-medium 
                text-(--color-main-text) outline-none 
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
            "
        />
        
        <button 
            type="button" 
            onclick={increment}
            class="flex h-12 w-14 items-center justify-center text-(--color-muted) transition-colors hover:text-(--color-accent) hover:bg-(--color-accent-subtle) active:bg-(--color-surface-raised)"
            aria-label="Increase break time"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
    </div>
</div>






