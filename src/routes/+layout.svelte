<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { activeSection } from '$lib/activeSection';

	let { children } = $props();

	//Apply Theme
	let hour = new Date().getHours();
	let isDark = $state(hour >= 20 || hour < 6);
	let themeColor = $derived(isDark ? '#16171d' : '#f4f5f7');
	let colorScheme = $derived(isDark ? 'dark' : 'light');

	$effect(() => {
        document.documentElement.classList.toggle('dark', isDark);
		document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    });

	function toggleTheme() {
        isDark = !isDark;
    }

	onMount(async () => {
		// if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
		// 	const { registerSW } = await import('virtual:pwa-register');
		// 	registerSW({ immediate: true });
		// }
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- <meta name="theme-color" content="{themeColor}" />
	<meta name="color-scheme" content="{colorScheme}" /> -->
</svelte:head>

<div>
	<nav
		class="sticky top-0 z-50 w-full border-b border-(--color-surface-raised) bg-(--color-main-bg) backdrop-blur-md"
	>
		<div class="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
			<button
				onclick={() => activeSection.set('work')}
				class="text-4xl font-bold tracking-tight text-(--color-main-text)"
			>
				timekit<span class="text-(--color-accent)">.</span>
			</button>

			<div class="flex items-center gap-8">
				<button
					onclick={() => activeSection.set('work')}
					class="text-md transition-colors {$activeSection === 'work'
						? 'font-bold text-(--color-accent)'
						: 'font-medium text-(--color-muted) hover:text-(--color-accent-hover)'}"
				>
					Work
				</button>

				<button
					onclick={() => activeSection.set('sleep')}
					class="text-md transition-colors {$activeSection === 'sleep'
						? 'font-bold text-(--color-accent)'
						: 'font-medium text-(--color-muted) hover:text-(--color-accent-hover)'}"
				>
					Sleep
				</button>
				<button
					onclick={toggleTheme}
					class="touch-manipulation relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
					aria-label="Toggle Theme"
				>
					{#if isDark}
						<div
							in:scale={{ duration: 300, delay: 150 }}
							out:scale={{ duration: 150 }}
							class="absolute inset-0 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
							</svg>
						</div>
					{:else}
						<div
							in:scale={{ duration: 300, delay: 150 }}
							out:scale={{ duration: 150 }}
							class="absolute inset-0 flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path
									d="m17.66 17.66 1.41 1.41"
								/><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path
									d="m19.07 4.93-1.41 1.41"
								/>
							</svg>
						</div>
					{/if}
				</button>
			</div>
		</div>
	</nav>

	<main id="app" class="mx-auto w-full max-w-3xl px-4 py-4">
		{@render children()}
	</main>
</div>
