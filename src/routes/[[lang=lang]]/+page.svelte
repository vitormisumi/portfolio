<script lang="ts">
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();

	let pageLoaded = $state(false);
	let duration = $state(0);
	let codeImageDelay = $state(0);
	let profileImageDelay = $state(0);
	let textDelay = $state(0);
	let projectsDelay = $state(0);

	let selectedProjectIndex = $state(0);
	let selectedProjectId = $derived(data.home.projects[selectedProjectIndex].id);
	let interval: number;

	function imageSlideshow() {
		interval = setInterval(() => {
			if (selectedProjectIndex === data.home.projects.length - 1) {
				selectedProjectIndex = 0;
			} else {
				selectedProjectIndex += 1;
			}
		}, 9000);
	}

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

		imageSlideshow();
	});
</script>

{#if pageLoaded}
	<div
		class="fixed top-0 -z-10 flex h-screen w-full flex-col items-center justify-evenly landscape:flex-row">
		<div class="flex h-44 w-full max-w-xs flex-col justify-end lg:h-80 lg:max-w-lg">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p
						class="w-full translate-x-2 pl-5 text-xs text-accent lg:pl-0 lg:text-base lg:translate-x-10">
						{data.home.translations[0].welcome_message}
					</p>
					<svg width="100%" class="absolute -z-10 h-8 text-4xl uppercase lg:h-12 lg:text-6xl">
						<text
							x="50%"
							y="48%"
							text-anchor="middle"
							dominant-baseline="central"
							font-family="Roboto Mono"
							font-weight="bold"
							fill="#F74C03"
							stroke="#F74C03"
							stroke-width="1">
							{data.home.name}
						</text>
					</svg>
					<svg width="100%" class="h-8 text-4xl uppercase lg:h-12 lg:text-6xl">
						<text
							x="50%"
							y="48%"
							text-anchor="middle"
							dominant-baseline="central"
							font-family="Roboto Mono"
							font-weight="bold"
							fill="none"
							stroke="#F74C03"
							stroke-width="1">
							{data.home.name}
						</text>
					</svg>
				</div>
				<img
					src="https://directus.vitormisumi.com/assets/{data.home.profile_image
						.id}?width=400&format=auto"
					alt={data.home.name}
					class="absolute -z-10 h-full shadow-secondary drop-shadow-[0_0_4px_rgba(255,252,242,0.2)]"
					in:fly={{ x: 500, duration: duration, delay: profileImageDelay }} />
			</div>
			<p
				class="text-center text-xs font-extralight tracking-tight text-secondary lg:text-lg lg:tracking-wide"
				in:fade={{ duration: duration, delay: textDelay }}>
				{data.home.translations[0].subtitle}
			</p>
		</div>
		<div class="relative" in:fade={{ delay: projectsDelay }}>
			<div
				class="grid h-48 w-full max-w-xs gap-2 rounded-lg border border-[#333333] bg-[#0B0F10] p-4 pt-2 shadow-2xl shadow-primary/10 lg:h-80 lg:max-w-lg">
				{#each data.home.projects as project}
					{#if project.id === selectedProjectId}
						<h3 class="font-roboto text-primary">{project.translations[0].title}</h3>
						<div class="w-full overflow-hidden rounded-lg" in:fade>
							<img
								src="https://directus.vitormisumi.com/assets/{project.home_image
									.id}?width=600&format=auto"
								alt="Projetos" />
						</div>
					{/if}
				{/each}
			</div>
			<div class="absolute flex w-full justify-center gap-2 py-2">
				{#each data.home.projects as project, i}
					<button
						class="rounded-full bg-secondary transition-all hover:bg-primary disabled:bg-primary {project.id ===
						selectedProjectId
							? 'h-2 w-5'
							: 'size-2'}"
						disabled={project.id === selectedProjectId}
						onclick={() => {
							selectedProjectIndex = i;
							clearInterval(interval);
							imageSlideshow();
						}}></button>
				{/each}
			</div>
		</div>
	</div>
{/if}
