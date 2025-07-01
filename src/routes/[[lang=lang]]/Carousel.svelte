<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { blur, fade } from 'svelte/transition';
	import type { PageData } from './$types';

	let { projectsDelay, data }: { projectsDelay: number; data: PageData } = $props();

	let selectedProjectIndex = $state(0);
	let selectedProject = $derived(data.home.projects[selectedProjectIndex]);
	let interval: number;
	let imageLoaded = $state(true); // Start as true to avoid initial flicker

	$effect(() => {
		selectedProject;
		imageLoaded = false;
	});

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
		imageSlideshow();
	});
</script>

<div
	class="relative"
	aria-roledescription="carousel"
	role="region"
	in:fade={{ delay: projectsDelay }}>
	<figure
		class="border-secondary bg-dark/5 shadow-secondary/20 dark:bg-light/5 grid aspect-[1.42] w-full max-w-xs gap-2 rounded-lg border p-2 shadow-2xl md:max-w-sm md:p-4 md:pt-2 lg:max-w-md landscape:max-w-64 landscape:md:max-w-xs landscape:lg:max-w-sm landscape:xl:max-w-md"
		id={String(selectedProject.id)}>
		<figcaption class="font-roboto text-dark dark:text-light text-sm md:text-base">
			{selectedProject.translations[0].title}
		</figcaption>
		<div
			class="relative w-full overflow-hidden rounded-lg"
			role="tabpanel"
			aria-labelledby={String(selectedProject.id)}>
			<div
				class="aspect-[1.42] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700 {imageLoaded
					? 'hidden'
					: ''}">
			</div>
			{#key selectedProject}
				<img
					src="https://directus.vitormisumi.com/assets/{selectedProject.home_image
						.id}?width=750&format=auto"
					alt={page.params.lang === 'pt'
						? `Screenshot do projeto ${selectedProject.translations[0].title}`
						: `Screenshot of project ${selectedProject.translations[0].title}`}
					onload={() => (imageLoaded = true)}
					onerror={() => (imageLoaded = true)}
					aria-roledescription="slide"
					class="h-auto w-full {imageLoaded ? '' : 'invisible'}"
					in:blur />
			{/key}
		</div>
	</figure>
	<div class="absolute flex w-full justify-center gap-2 py-2" role="tablist">
		{#each data.home.projects as project, i}
			<button
				class="bg-secondary hover:bg-accent disabled:bg-dark dark:disabled:bg-light rounded-full transition-all {project.id ===
				selectedProject.id
					? 'h-2 w-5'
					: 'size-2'}"
				disabled={project.id === selectedProject.id}
				aria-selected={project.id === selectedProject.id}
				aria-controls={String(selectedProject.id)}
				aria-label={project.translations[0].title}
				role="tab"
				onclick={() => {
					selectedProjectIndex = i;
					clearInterval(interval);
					imageSlideshow();
				}}></button>
		{/each}
	</div>
</div>
