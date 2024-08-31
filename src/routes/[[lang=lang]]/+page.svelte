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
	<div
		class="fixed top-0 -z-10 flex h-screen w-full flex-col items-center justify-evenly landscape:flex-row">
		<div class="flex h-44 w-fit max-w-xs flex-col justify-end gap-2 lg:h-80 lg:max-w-lg">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p class="w-full text-xs text-primary lg:text-base">
						{data.home.translations[0].welcome_message}
					</p>
					<h1>
						<svg
							class="absolute -z-10 h-8 w-[260px] text-4xl uppercase lg:h-12 lg:w-[435px] lg:text-6xl">
							<text
								x="50%"
								y="50%"
								text-anchor="middle"
								dominant-baseline="central"
								font-family="Roboto Mono"
								font-weight="bold"
								fill="#FFFCF2"
								stroke="#FFFCF2"
								stroke-width="1">
								{data.home.name}
							</text>
						</svg>
						<svg class="h-8 w-[260px] text-4xl uppercase lg:h-12 lg:w-[435px] lg:text-6xl">
							<text
								x="50%"
								y="50%"
								text-anchor="middle"
								dominant-baseline="central"
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
			<h2
				class="text-center font-mono text-xs font-extralight tracking-tight text-secondary lg:text-lg lg:tracking-wide"
				in:fade={{ duration: duration, delay: textDelay }}>
				{data.home.translations[0].subtitle}
			</h2>
			<div class="flex w-full justify-center gap-2 text-2xl text-secondary landscape:justify-start" in:fade={{ duration: duration, delay: textDelay }}>
				<a href="https://github.com/vitormisumi">
					<iconify-icon icon="mdi:github"></iconify-icon>
				</a>
				<a href="https://www.linkedin.com/in/vitormisumi">
					<iconify-icon icon="mdi:linkedin"></iconify-icon>
				</a>
			</div>
		</div>
		<Carousel {data} {projectsDelay} />
	</div>
{/if}
