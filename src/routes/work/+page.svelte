<script lang="ts">
	import { fade } from 'svelte/transition';

	import TimeInput from '$lib/components/TimeInput.svelte';
	import BreakInput from '$lib/components/BreakInput.svelte';

	let activeTab = $state('Work Time');
	const tabs = ['Work Time', 'Work Start', 'Work End'];

	// Automatically updates when activeTab changes
	let activeIndex = $derived(tabs.indexOf(activeTab));

	// Time Calculations
	let workStartTime = $state('07:00');
	let workEndTime = $state('15:30');
	let breakDuration = $state(30);
	let workTimeCustom = $state('08:00');

	//Calculate work time
	let workTime = $derived.by(() => {
		if (!workStartTime || !workEndTime) return { hours: 0, mins: 0 };

		// 1. Convert "HH:MM" into total minutes from midnight
		const [startH, startM] = workStartTime.split(':').map(Number);
		const [endH, endM] = workEndTime.split(':').map(Number);

		const startTotalMins = startH * 60 + startM;
		const endTotalMins = endH * 60 + endM;

		// 2. Calculate the difference
		let grossWorkMins = endTotalMins - startTotalMins;

		// 3. Handle night shifts (crossing midnight)
		if (grossWorkMins < 0) {
			grossWorkMins += 24 * 60;
		}

		// 4. Subtract the break time
		let netMins = grossWorkMins - breakDuration;

		// 5. Prevent negative time if the break is longer than the shift
		if (netMins < 0) netMins = 0;

		// 6. Convert back to hours and minutes
		return {
			hours: Math.floor(netMins / 60),
			mins: netMins % 60
		};
	});

	//Calculate work start time based on end time and work duration
	let calculatedWorkStart = $derived.by(() => {
		if (!workEndTime || !workTimeCustom) return '00:00';

		// 1. Convert "HH:MM" into total minutes from midnight
		const [endH, endM] = workEndTime.split(':').map(Number);
		const [workH, workM] = workTimeCustom.split(':').map(Number);

		const endTotalMins = endH * 60 + endM;
		const workTotalMins = workH * 60 + workM;

		// 2. Calculate the start time by subtracting work duration from end time
		let startTotalMins = endTotalMins - workTotalMins;

		// 3. Handle night shifts (crossing midnight)
		if (startTotalMins < 0) {
			startTotalMins += 24 * 60;
		}

		let netMins = startTotalMins + breakDuration;


		// 4. Convert back to "HH:MM"
		const startH = Math.floor( netMins / 60);
		const startM = netMins % 60;

		return `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
	});

	//Calculate work start time based on end time and work duration
	let calculatedWorkEnd = $derived.by(() => {
		if (!workStartTime || !workTimeCustom) return '00:00';

		// 1. Convert "HH:MM" into total minutes from midnight
		const [startH, startM] = workStartTime.split(':').map(Number);
		const [workH, workM] = workTimeCustom.split(':').map(Number);

		const startTotalMins = startH * 60 + startM;
		const workTotalMins = workH * 60 + workM;

		// 2. Calculate the end time by adding work duration to start time
		let endTotalMins = startTotalMins + workTotalMins;

		// 3. Handle night shifts (crossing midnight)
		if (endTotalMins >= 24 * 60) {
			endTotalMins -= 24 * 60;
		}

		let netMins = endTotalMins + breakDuration;


		// 4. Convert back to "HH:MM"
		const endH = Math.floor( netMins / 60);
		const endM = netMins % 60;

		return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
	});
</script>

<h1>Work Page</h1>

<div class="relative flex w-full rounded-xl bg-(--color-surface) p-2">
	<div class="pointer-events-none absolute inset-1 flex">
		<div
			class="w-1/3 rounded-lg bg-(--color-surface-raised) shadow-sm transition-all duration-400 ease-out"
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

		<!-- Work Time  -->
		{#if activeTab === 'Work Time'}
			<div class="will-change-opacity col-start-1 row-start-1">
				<div class="space-y-10 p-6">
					<div class="mx-auto max-w-md space-y-6">
						<TimeInput label="Work Start Time" id="work-start" bind:value={workStartTime} />
						<BreakInput
							label="Break Duration (minutes)"
							id="break-time"
							bind:value={breakDuration}
						/>
						<TimeInput label="Work End Time" id="work-end" bind:value={workEndTime} />
					</div>

					<div
						class="flex flex-col items-center justify-center rounded-2xl border-2 border-(--color-surface-raised) bg-(--color-surface) py-8 shadow-sm"
					>
						<h2 class="mb-2 text-sm font-medium tracking-wider text-(--color-muted) uppercase">
							Total Work Time
						</h2>
						<div class="text-5xl font-bold text-(--color-accent) tabular-nums">
							{workTime.hours}<span class="mr-3 ml-1 text-2xl text-(--color-main-text)">h</span>
							{workTime.mins.toString().padStart(2, '0')}<span
								class="ml-1 text-2xl text-(--color-main-text)">m</span
							>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Work Start -->
		{#if activeTab === 'Work Start'}
			<div class="will-change-opacity col-start-1 row-start-1">
				<div class="space-y-10 p-6">
					<div class="mx-auto max-w-md space-y-6">
						<TimeInput label="Work End Time" id="work-end" bind:value={workEndTime} />
						<BreakInput
							label="Break Duration (minutes)"
							id="break-time"
							bind:value={breakDuration}
						/>
						<TimeInput label="Work Time" id="work-time" bind:value={workTimeCustom} />
					</div>

					<div
						class="flex flex-col items-center justify-center rounded-2xl border-2 border-(--color-surface-raised) bg-(--color-surface) py-8 shadow-sm"
					>
						<h2 class="mb-2 text-sm font-medium tracking-wider text-(--color-muted) uppercase">
							Work Start Time
						</h2>
						<div class="text-5xl font-bold text-(--color-accent) tabular-nums">
							{calculatedWorkStart}
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Work End Time  -->
		{#if activeTab === 'Work End'}
			<div class="will-change-opacity col-start-1 row-start-1">
				<div class="space-y-10 p-6">
					<div class="mx-auto max-w-md space-y-6">
						<TimeInput label="Work Start Time" id="work-start" bind:value={workStartTime} />
						<BreakInput
							label="Break Duration (minutes)"
							id="break-time"
							bind:value={breakDuration}
						/>
						<TimeInput label="Work Time" id="work-time" bind:value={workTimeCustom} />
					</div>

					<div
						class="flex flex-col items-center justify-center rounded-2xl border-2 border-(--color-surface-raised) bg-(--color-surface) py-8 shadow-sm"
					>
						<h2 class="mb-2 text-sm font-medium tracking-wider text-(--color-muted) uppercase">
							Work End Time
						</h2>
						<div class="text-5xl font-bold text-(--color-accent) tabular-nums">
							{calculatedWorkEnd}
						</div>
					</div>
				</div>
			</div>
		{/if}


	{/key}
</div>
