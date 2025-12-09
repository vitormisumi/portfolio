<script lang="ts">
	import { navigating } from '$app/state';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { PUBLIC_URL } from '$env/static/public';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import Autoplay from 'embla-carousel-autoplay';

	let { data } = $props();

	let pageLoaded = $state(false);
	let duration = $state(0);
	let profileImageDelay = $state(0);
	let textDelay = $state(0);
	let projectsDelay = $state(0);

	onMount(() => {
		if (navigating.from?.url.href.startsWith(PUBLIC_URL)) {
			duration = 0;
			profileImageDelay = 0;
			textDelay = 0;
			projectsDelay = 0;
		} else {
			duration = 1500;
			profileImageDelay = 1500;
			textDelay = 3000;
			projectsDelay = 4000;
		}
		pageLoaded = true;
	});

	const plugin = Autoplay({ delay: 5000, stopOnInteraction: true });
</script>

{#if pageLoaded}
	<div class="flex h-full w-full flex-col items-center justify-around landscape:flex-row">
		<div
			class="relative flex aspect-[1.6] w-full max-w-xs flex-col justify-end gap-2 md:max-w-sm lg:max-w-md landscape:max-w-64 landscape:md:max-w-xs landscape:lg:max-w-sm landscape:xl:max-w-md landscape:2xl:max-w-xl">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p class="text-dark dark:text-light w-full text-xs lg:text-base">
						{data.home.translations[0].welcome_message}
					</p>
					<h1
						class="stroke-dark font-roboto text-dark dark:fill-light dark:stroke-light stroke-1 text-5xl font-bold uppercase">
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
					class="shadow-secondary absolute -z-10 h-full drop-shadow-[0_0_4px_rgba(255,252,242,0.2)]"
					in:fly={{ x: 500, duration: duration, delay: profileImageDelay }} />
			</div>
			<div
				class="flex w-full items-center justify-between"
				in:fade={{ duration: duration, delay: textDelay }}>
				<h2 class="font-mono text-xs font-extralight whitespace-nowrap md:text-sm lg:text-base">
					{data.home.translations[0].subtitle}
				</h2>
				<div class="flex gap-2 text-xl lg:text-2xl">
					<a
						href="https://github.com/vitormisumi"
						aria-label="GitHub"
						style:view-transition-name="github">
						<iconify-icon icon="mdi:github"></iconify-icon>
					</a>
					<a
						href="https://www.linkedin.com/in/vitormisumi"
						aria-label="LinkedIn"
						style:view-transition-name="linkedin">
						<iconify-icon icon="mdi:linkedin"></iconify-icon>
					</a>
				</div>
			</div>
		</div>
		<div in:fade={{ delay: projectsDelay }}>
			<Carousel.Root
				plugins={[plugin]}
				onmouseenter={plugin.stop}
				onmouseleave={plugin.reset}
				class="max-w-xs md:max-w-sm lg:max-w-md landscape:max-w-64 landscape:md:max-w-xs landscape:lg:max-w-sm landscape:xl:max-w-md landscape:2xl:max-w-xl">
				<Carousel.Content>
					{#each data.home.projects as project}
						<Carousel.Item>
							<img
								src="https://directus.vitormisumi.com/assets/{project.home_image
									.id}?width=600&format=auto"
								alt={project.translations[0].title}
								class="bg-secondary rounded-lg border p-2" />
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous class="left-4" />
				<Carousel.Next class="right-4" />
			</Carousel.Root>
		</div>
	</div>
{/if}
