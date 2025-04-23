<!-- @migration task: review uses of `navigating` -->
<script lang="ts">
	import { navigating } from '$app/state';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Carousel from './Carousel.svelte';

	let { data } = $props();

	let pageLoaded = $state(false);
	let duration = $state(0);
	let profileImageDelay = $state(0);
	let textDelay = $state(0);
	let projectsDelay = $state(0);

	onMount(() => {
		if (navigating.from) {
			duration = 0;
			profileImageDelay = 0;
			textDelay = 0;
			projectsDelay = 0;
		} else {
			duration = 1500;
			profileImageDelay = 1500;
			textDelay = 3000;
			projectsDelay = 4500;
		}
		pageLoaded = true;
	});
</script>

{#if pageLoaded}
	<div class="flex h-full w-full flex-col items-center justify-around landscape:flex-row">
		<div
			class="relative flex aspect-[1.6] w-full max-w-xs flex-col justify-end gap-2 md:max-w-sm lg:max-w-md landscape:max-w-64 landscape:md:max-w-xs landscape:lg:max-w-sm landscape:xl:max-w-md">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p class="w-full text-xs text-dark dark:text-light lg:text-base">
						{data.home.translations[0].welcome_message}
					</p>
					<h1
						class="stroke-dark stroke-1 font-roboto text-5xl font-bold uppercase text-dark dark:fill-light dark:stroke-light">
						<svg viewBox="0 0 300 37" class="absolute -z-10 w-full">
							<text
								x="0"
								y="45%"
								textLength="300"
								lengthAdjust="spacingAndGlyphs"
								dominant-baseline="central">
								{data.home.name}
							</text>
						</svg>
						<svg viewBox="0 0 300 37" class="w-full">
							<text
								x="0"
								y="45%"
								textLength="300"
								lengthAdjust="spacingAndGlyphs"
								dominant-baseline="central"
								fill="none">
								{data.home.name}
							</text>
						</svg>
					</h1>
				</div>
				<img
					src="https://directus.vitormisumi.com/assets/{data.home.profile_image
						.id}?width=400&format=auto"
					alt={data.home.name}
					class="absolute -z-10 h-full shadow-secondary drop-shadow-[0_0_4px_rgba(255,252,242,0.2)]"
					in:fly={{ x: 500, duration: duration, delay: profileImageDelay }} />
			</div>
			<div
				class="flex w-full items-center justify-between"
				in:fade={{ duration: duration, delay: textDelay }}>
				<h2
					class="whitespace-nowrap font-mono text-xs font-extralight text-secondary dark:text-secondary md:text-sm lg:text-base">
					{data.home.translations[0].subtitle}
				</h2>
				<div class="flex gap-2 text-xl text-secondary lg:text-2xl">
					<a href="https://github.com/vitormisumi" aria-label="GitHub">
						<iconify-icon icon="mdi:github"></iconify-icon>
					</a>
					<a href="https://www.linkedin.com/in/vitormisumi" aria-label="LinkedIn">
						<iconify-icon icon="mdi:linkedin"></iconify-icon>
					</a>
				</div>
			</div>
		</div>
		<Carousel {data} {projectsDelay} />
	</div>
{/if}
