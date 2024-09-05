<script lang="ts">
	import { navigating } from '$app/stores';
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
		if ($navigating) {
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
			class="relative flex aspect-[1.5] w-full max-w-xs flex-col justify-end gap-2 md:max-w-sm lg:max-w-md landscape:max-w-xs landscape:lg:max-w-sm">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p class="w-full text-xs text-primary lg:text-base">
						{data.home.translations[0].welcome_message}
					</p>
					<h1>
						<svg viewBox="0 0 300 35" class="absolute -z-10 w-full uppercase">
							<text
								x="0"
								y="48%"
								textLength="300"
								lengthAdjust="spacingAndGlyphs"
								dominant-baseline="central"
								font-size="42"
								font-family="Roboto Mono"
								font-weight="bold"
								fill="#FFFCF2"
								stroke="#FFFCF2"
								stroke-width="1">
								{data.home.name}
							</text>
						</svg>
						<svg viewBox="0 0 300 35" class="w-full uppercase">
							<text
								x="0"
								y="48%"
								textLength="300"
								lengthAdjust="spacingAndGlyphs"
								dominant-baseline="central"
								font-size="42"
								font-family="Roboto Mono"
								font-weight="bold"
								fill="none"
								stroke="#FFFCF2"
								stroke-width="1">
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
				class="flex w-full justify-between items-center"
				in:fade={{ duration: duration, delay: textDelay }}>
				<h2
					class="whitespace-nowrap font-mono text-xs font-extralight text-secondary md:text-sm lg:text-base">
					{data.home.translations[0].subtitle}
				</h2>
				<div class="flex gap-2 text-lg text-secondary lg:text-2xl">
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
