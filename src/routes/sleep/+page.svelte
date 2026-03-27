<h1>Sleep Page</h1>

<script lang="ts">
    import TimeInput from '$lib/components/TimeInput.svelte';

    // Default wake time
    let wakeTime = $state("07:00");

    // Calculate optimal bedtimes based on 90-minute cycles + 15 mins to fall asleep
    let bedtimes = $derived.by(() => {
        if (!wakeTime) return [];

        const [wakeH, wakeM] = wakeTime.split(':').map(Number);
        const wakeTotalMins = (wakeH * 60) + wakeM;

        // 6 cycles (9h), 5 cycles (7.5h), 4 cycles (6h), 3 cycles (4.5h)
        const cyclesToCalculate = [6, 5, 4, 3]; 

        return cyclesToCalculate.map(cycles => {
            const sleepDurationMins = cycles * 90;
            const timeToFallAsleep = 15;
            
            // Subtract sleep duration AND the 15 mins to fall asleep
            let bedTotalMins = wakeTotalMins - sleepDurationMins - timeToFallAsleep;

            // Handle wrapping around midnight (going back into the previous day)
            if (bedTotalMins < 0) {
                bedTotalMins += 24 * 60;
            }

            const h = Math.floor(bedTotalMins / 60);
            const m = bedTotalMins % 60;

            return {
                cycles,
                durationLabel: `${cycles * 1.5} Hours`,
                timeString: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
                // Highlight 5 and 6 cycles as optimal
                isOptimal: cycles >= 5 
            };
        });
    });
</script>

<div class="p-4 sm:p-6 lg:p-8">
    <div class="mx-auto max-w-md space-y-8">
        
        <TimeInput label="I want to wake up at" id="wake-time" bind:value={wakeTime} />

        <div class="space-y-4">
            <h2 class="text-sm font-medium text-(--color-muted) uppercase tracking-wider text-center">
                Get into bed at
            </h2>

            <div class="grid gap-3">
                {#each bedtimes as bed (bed.cycles)}
                    <div class="
                        flex items-center justify-between rounded-xl border-2 p-4 transition-all
                        {bed.isOptimal 
                            ? 'border-(--color-accent) bg-(--color-accent-subtle)' 
                            : 'border-(--color-surface-raised) bg-(--color-surface)'}
                    ">
                        <div class="flex flex-col">
                            <span class="text-sm font-medium {bed.isOptimal ? 'text-(--color-accent)' : 'text-(--color-muted)'}">
                                {bed.cycles} Cycles
                            </span>
                            <span class="text-xs text-(--color-muted)">
                                {bed.durationLabel} of sleep
                            </span>
                        </div>
                        
                        <div class="font-mono text-3xl font-bold {bed.isOptimal ? 'text-(--color-accent)' : 'text-(--color-main-text)'}">
                            {bed.timeString}
                        </div>
                    </div>
                {/each}
            </div>
            
            <p class="text-xs text-center text-(--color-muted) pt-2">
                *Calculated using 90-minute sleep cycles, plus 15 minutes to fall asleep.
            </p>
        </div>

    </div>
</div>