<script lang="ts">
	import TimeInput from '$lib/components/TimeInput.svelte';
	import BreakInput from '$lib/components/BreakInput.svelte';
	import WorkTimeResult from '$lib/components/WorkTimeResult.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import BasicCard from '$lib/components/BasicCard.svelte';

	let activeTab = $state('Work Time');
	const tabs = ['Work Time', 'Work End', 'Work Start'];

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
		if (!workEndTime || !workTimeCustom) return { hours: 0, mins: 0 };

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

		return {
			hours: Math.floor(netMins / 60),
			mins: netMins % 60
		};
	});

	//Calculate work start time based on end time and work duration
	let calculatedWorkEnd = $derived.by(() => {
		if (!workStartTime || !workTimeCustom) return { hours: 0, mins: 0 };

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

		return {
			hours: Math.floor(netMins / 60),
			mins: netMins % 60
		};
	});
</script>

<Tabs bind:activeTab {tabs}></Tabs>

<div class="grid py-6">
	{#key activeTab}
		<!-- Work Time  -->
		{#if activeTab === 'Work Time'}
			<BasicCard>
				<TimeInput label="Work Start Time" id="work-start" bind:value={workStartTime} />
				<BreakInput label="Break Duration (minutes)" id="break-time" bind:value={breakDuration} />
				<TimeInput label="Work End Time" id="work-end" bind:value={workEndTime} />
			</BasicCard>

			<WorkTimeResult label="Total work time (hh:mm)" hours={workTime.hours} mins={workTime.mins}
			></WorkTimeResult>
		{/if}

		<!-- Work End Time  -->
		{#if activeTab === 'Work End'}
			<BasicCard>
				<TimeInput label="Work Start Time" id="work-start" bind:value={workStartTime} />
				<BreakInput label="Break Duration (minutes)" id="break-time" bind:value={breakDuration} />
				<TimeInput label="Work Time" id="work-time" bind:value={workTimeCustom} />
			</BasicCard>

			<WorkTimeResult
				label="Work Time End"
				hours={calculatedWorkEnd.hours}
				mins={calculatedWorkEnd.mins}
			></WorkTimeResult>
		{/if}

		<!-- Work Start -->
		{#if activeTab === 'Work Start'}
			<BasicCard>
				<TimeInput label="Work End Time" id="work-end" bind:value={workEndTime} />
				<BreakInput label="Break Duration (minutes)" id="break-time" bind:value={breakDuration} />
				<TimeInput label="Work Time" id="work-time" bind:value={workTimeCustom} />
			</BasicCard>

			<WorkTimeResult
				label="Work Time Start"
				hours={calculatedWorkStart.hours}
				mins={calculatedWorkStart.mins}
			></WorkTimeResult>
		{/if}
	{/key}
</div>
