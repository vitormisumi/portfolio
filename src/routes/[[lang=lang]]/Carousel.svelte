<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { blur, fade } from 'svelte/transition';
	import type { PageData } from './$types';

	let { projectsDelay, data }: { projectsDelay: number; data: PageData } = $props();

	let selectedProjectIndex = $state(0);
	let selectedProject = $derived(data.home.projects[selectedProjectIndex]);
	let interval: number;

	function imageSlideshow() {
		interval = setInterval(() => {
			if (selectedProjectIndex === data.home.projects.length - 1) {
				selectedProjectIndex = 0;
				imageLoaded = false;
			} else {
				selectedProjectIndex += 1;
				imageLoaded = false;
			}
		}, 9000);
	}

	onMount(() => {
		imageSlideshow();
	});

	let imageLoaded = $state(false);
</script>

<div
	class="relative"
	aria-roledescription="carousel"
	role="region"
	in:fade={{ delay: projectsDelay }}>
	<figure
		class="bg-dark/5 dark:bg-light/5 grid aspect-[1.5] w-full max-w-xs gap-2 rounded-lg border border-secondary p-4 pt-2 shadow-2xl shadow-secondary/20 md:max-w-sm lg:max-w-md landscape:max-w-xs landscape:lg:max-w-sm landscape:xl:max-w-md"
		id={String(selectedProject.id)}>
		<figcaption class="text-dark dark:text-light font-roboto">
			{selectedProject.translations[0].title}
		</figcaption>
		<div
			class="w-full overflow-hidden rounded-lg"
			role="tabpanel"
			aria-labelledby={String(selectedProject.id)}>
			{#key selectedProject}
				<img
					src="https://directus.vitormisumi.com/assets/{selectedProject.home_image
						.id}?width=750&format=auto"
					alt={$page.params.lang === 'pt'
						? `Screenshot do projeto ${selectedProject.translations[0].title}`
						: `Screenshot of project ${selectedProject.translations[0].title}`}
					onload={() => (imageLoaded = true)}
					aria-roledescription="slide"
					in:blur />
			{/key}
			{#if !imageLoaded}
				<div class="w-[512px]"></div>
			{/if}
		</div>
	</figure>
	<div class="absolute flex w-full justify-center gap-2 py-2" role="tablist">
		{#each data.home.projects as project, i}
			<button
				class="disabled:bg-dark disabled:dark:bg-light rounded-full bg-secondary transition-all hover:bg-accent {project.id ===
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
