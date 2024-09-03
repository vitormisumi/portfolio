<script lang="ts">
	import { onMount } from 'svelte';
	import { blur, fade } from 'svelte/transition';
	import type { PageData } from './$types';

	let {
		projectsDelay,
		data
	}: {
		projectsDelay: number;
		data: PageData;
	} = $props();

	let selectedProjectIndex = $state(0);
	let selectedProject = $derived(data.home.projects[selectedProjectIndex]);
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
		imageSlideshow();
	});
</script>

<div
	class="relative"
	aria-roledescription="carousel"
	role="region"
	in:fade={{ delay: projectsDelay }}>
	<figure
		class="grid aspect-[1.5] w-full max-w-xs lg:max-w-md gap-2 rounded-lg border border-primary/10 bg-primary/5 p-4 pt-2 shadow-2xl shadow-secondary/20 xl:max-w-lg"
		id={String(selectedProject.id)}>
		<figcaption class="font-roboto text-primary">
			{selectedProject.translations[0].title}
		</figcaption>
		{#key selectedProject.home_image.id}
			<div class="w-full overflow-hidden rounded-lg">
				<img
					src="https://directus.vitormisumi.com/assets/{selectedProject.home_image
						.id}?width=600&format=auto"
					alt="Screenshot"
					role="group"
					aria-roledescription="slide"
					aria-labelledby={String(selectedProject.id)}
					in:blur />
			</div>
		{/key}
	</figure>
	<div class="absolute flex w-full justify-center gap-2 py-2">
		{#each data.home.projects as project, i}
			<button
				class="rounded-full bg-secondary transition-all hover:bg-accent disabled:bg-primary {project.id ===
				selectedProject.id
					? 'h-2 w-5'
					: 'size-2'}"
				disabled={project.id === selectedProject.id}
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
