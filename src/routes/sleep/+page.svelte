<script lang="ts">
	import TimeInput from '$lib/components/TimeInput.svelte';

	let activeTab = $state('Wake Time');
	const tabs = ['Wake Time', 'Bedtime'];
	// Automatically updates when activeTab changes
	let activeIndex = $derived(tabs.indexOf(activeTab));

	// Default wake time
	let wakeTime = $state('07:00');

	// Default bedtime
	let bedTime = $state('22:30');

	// Function to grab the current time and update the input
	function setSleepNow() {
		const now = new Date();
		const h = now.getHours().toString().padStart(2, '0');
		const m = now.getMinutes().toString().padStart(2, '0');

		bedTime = `${h}:${m}`;
	}

	let wakeTimes = $derived.by(() => {
		if (!bedTime) return [];

		const [bedH, bedM] = bedTime.split(':').map(Number);
		const bedTotalMins = bedH * 60 + bedM;

		const cyclesToCalculate = [3, 4, 5, 6];

		return cyclesToCalculate.map((cycles) => {
			const sleepDurationMins = cycles * 90;
			const timeToFallAsleep = 15;

			let wakeTotalMins = bedTotalMins + timeToFallAsleep + sleepDurationMins;
			wakeTotalMins = wakeTotalMins % (24 * 60);

			const h = Math.floor(wakeTotalMins / 60);
			const m = wakeTotalMins % 60;

			return {
				cycles,
				durationLabel: `${cycles * 1.5} Hours`,
				timeString: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
				isOptimal: cycles >= 5
			};
		});
	});

	// Calculate optimal bedtimes based on 90-minute cycles + 15 mins to fall asleep
	let bedtimes = $derived.by(() => {
		if (!wakeTime) return [];

		const [wakeH, wakeM] = wakeTime.split(':').map(Number);
		const wakeTotalMins = wakeH * 60 + wakeM;

		// 6 cycles (9h), 5 cycles (7.5h), 4 cycles (6h), 3 cycles (4.5h)
		const cyclesToCalculate = [6, 5, 4, 3];

		return cyclesToCalculate.map((cycles) => {
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


<div class="relative flex w-full rounded-xl bg-(--color-surface) p-2">
	<div class="pointer-events-none absolute inset-1 flex">
		<div
			class="w-1/2 rounded-lg bg-(--color-surface-raised) shadow-sm transition-all duration-400 ease-out"
			style="transform: translateX({activeIndex * 100}%);"
		></div>
	</div>
	{#each tabs as tab (tab)}
		<button
			onclick={() => (activeTab = tab)}
			class="text-md relative z-10 flex-1 rounded-lg px-5 py-3 font-medium transition-all duration-400
			{activeTab === tab ? 'text-(--color-accent)' : 'text-(--color-muted)'}"
		>
			{tab}
		</button>
	{/each}
</div>

<div class="grid px-2 py-6">
	{#key activeTab}
		<!-- Waketime  -->
		{#if activeTab === 'Wake Time'}
			<div class="p-4 sm:p-6 lg:p-8">
				<div class="mx-auto max-w-md space-y-8">
					<div class="space-y-3">
						<TimeInput label="I am going to bed at" id="bed-time" bind:value={bedTime} />

						<button
							type="button"
							onclick={setSleepNow}
							class="
                    w-full rounded-xl bg-(--color-surface-raised) py-3 text-sm font-medium
                    text-(--color-main-text) shadow-sm transition-all duration-300
                    hover:bg-(--color-accent-subtle) hover:text-(--color-accent)
                    active:scale-[0.98] active:bg-(--color-surface)
                "
						>
							💤 Sleep Now
						</button>
					</div>

					<div class="space-y-4">
						<h2
							class="text-center text-sm font-medium tracking-wider text-(--color-muted) uppercase"
						>
							Set your alarm for
						</h2>

						<div class="grid gap-3">
							{#each wakeTimes as wake (wake.cycles)}
								<div
									class="
                        flex items-center justify-between rounded-xl border-2 p-4 transition-all
                        {wake.isOptimal
										? 'border-(--color-accent) bg-(--color-accent-subtle)'
										: 'border-(--color-surface-raised) bg-(--color-surface)'}
                    "
								>
									<div class="flex flex-col">
										<span
											class="text-sm font-medium {wake.isOptimal
												? 'text-(--color-accent)'
												: 'text-(--color-muted)'}"
										>
											{wake.cycles} Cycles
										</span>
										<span class="text-xs text-(--color-muted)">
											{wake.durationLabel} of sleep
										</span>
									</div>

									<div
										class="font-mono text-3xl font-bold {wake.isOptimal
											? 'text-(--color-accent)'
											: 'text-(--color-main-text)'}"
									>
										{wake.timeString}
									</div>
								</div>
							{/each}
						</div>

						<p class="pt-2 text-center text-xs text-(--color-muted)">
							*Calculated using 90-minute sleep cycles, allowing 15 minutes to fall asleep.
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Bedtime  -->
		{#if activeTab === 'Bedtime'}
			<div class="p-4 sm:p-6 lg:p-8">
				<div class="mx-auto max-w-md space-y-8">
					<TimeInput label="I want to wake up at" id="wake-time" bind:value={wakeTime} />

					<div class="space-y-4">
						<h2
							class="text-center text-sm font-medium tracking-wider text-(--color-muted) uppercase"
						>
							Get into bed at
						</h2>

						<div class="grid gap-3">
							{#each bedtimes as bed (bed.cycles)}
								<div
									class="
                                flex items-center justify-between rounded-xl border-2 p-4 transition-all
                                {bed.isOptimal
										? 'border-(--color-accent) bg-(--color-accent-subtle)'
										: 'border-(--color-surface-raised) bg-(--color-surface)'}
                            "
								>
									<div class="flex flex-col">
										<span
											class="text-sm font-medium {bed.isOptimal
												? 'text-(--color-accent)'
												: 'text-(--color-muted)'}"
										>
											{bed.cycles} Cycles
										</span>
										<span class="text-xs text-(--color-muted)">
											{bed.durationLabel} of sleep
										</span>
									</div>

									<div
										class="font-mono text-3xl font-bold {bed.isOptimal
											? 'text-(--color-accent)'
											: 'text-(--color-main-text)'}"
									>
										{bed.timeString}
									</div>
								</div>
							{/each}
						</div>

						<p class="pt-2 text-center text-xs text-(--color-muted)">
							*Calculated using 90-minute sleep cycles, plus 15 minutes to fall asleep.
						</p>
					</div>
				</div>
			</div>
		{/if}
	{/key}
</div>
