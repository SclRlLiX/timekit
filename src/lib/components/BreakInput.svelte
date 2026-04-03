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
    <label for={id}>
        {label}
    </label>
    
    <div class="
        flex items-center overflow-hidden rounded-xl border py-1
        border-(--color-surface-raised)/70 bg-(--color-surface-raised)/25
        transition-all duration-300 ease-in-out 
        focus-within:border-(--color-accent)/70 focus-within:ring-2 focus-within:ring-(--color-accent)/50
    ">
        
        <button 
            type="button" 
            onclick={decrement}
            class="touch-manipulation rounded-full flex h-10 w-14 ml-3 items-center justify-center text-(--color-muted) transition-colors bg-(--color-surface-raised) border border-(--color-surface-raised) hover:text-(--color-accent) hover:bg-(--color-accent-subtle) active:bg-(--color-surface-sublte)"
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
            class="touch-manipulation rounded-full flex h-10 w-14 mr-3 items-center justify-center text-(--color-muted) transition-colors bg-(--color-surface-raised) border border-(--color-surface-raised) hover:text-(--color-accent) hover:bg-(--color-accent-subtle) active:bg-(--color-surface-subtle)"
            aria-label="Increase break time"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
    </div>
</div>






