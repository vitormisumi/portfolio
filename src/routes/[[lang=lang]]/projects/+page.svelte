<script lang="ts">
	import { fade } from 'svelte/transition';
	import Screen from './Screen.svelte';

	let { data } = $props();

	let selectedProject = $state(data.projects[0]);
	let selectedImageId = $state(data.projects[0].images[0].id);
</script>

<section
	class="flex flex-col items-center gap-4 md:gap-8 landscape:grid landscape:grid-cols-4 landscape:items-start landscape:gap-8">
	<nav class="max-h-96 w-full max-w-xl landscape:max-w-full">
		<ul class="flex gap-6 overflow-x-auto font-mono text-xs landscape:flex-col landscape:text-base">
			{#each data.projects as project, i}
				<li>
					<button
						class="hover:text-accent list-item max-w-32 truncate text-left md:max-w-44 lg:max-w-60 {project.id ===
						selectedProject.id
							? 'underline underline-offset-4'
							: ''}"
						onclick={() => {
							selectedProject = project;
							selectedImageId = data.projects[i].images[0].id;
						}}>
						{project.translations[0].title}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="col-span-3 flex w-full justify-center">
		{#key selectedProject}
			<article
				class="flex h-[80vh] max-w-xl flex-col place-items-center gap-4 landscape:grid landscape:max-w-full landscape:grid-cols-2 landscape:place-items-start landscape:gap-8"
				in:fade>
				<div
					class="flex w-full flex-1 flex-col gap-4 overflow-auto mask-b-from-80% landscape:max-h-[50vh]">
					<div>
						<a
							href={selectedProject.link}
							class="font-roboto text-dark dark:text-light text-lg font-medium"
							>{selectedProject.translations[0].title}</a>
						<h3 class="font-mono text-xs font-extralight capitalize">
							<time datetime={selectedProject.start_date}>
								{new Date(selectedProject.start_date)
									.toLocaleDateString(selectedProject.translations[0].languages_code, {
										year: '2-digit',
										month: 'short'
									})
									.replace('. de', '')}
							</time>
							→
							<time datetime={selectedProject.end_date}>
								{new Date(selectedProject.end_date)
									.toLocaleDateString(selectedProject.translations[0].languages_code, {
										year: '2-digit',
										month: 'short'
									})
									.replace('. de', '')}
							</time>
						</h3>
					</div>
					<div class="content pb-16 landscape:pb-24">
						{@html selectedProject.translations[0].description}
					</div>
				</div>
				<Screen project={selectedProject} />
			</article>
		{/key}
	</div>
</section>

<div
	class="fixed top-4 right-6 flex gap-2 text-xl lg:text-2xl landscape:top-auto landscape:right-auto landscape:bottom-16 landscape:left-6 landscape:flex-col">
	<a href="https://github.com/vitormisumi" aria-label="GitHub" style:view-transition-name="github">
		<iconify-icon icon="mdi:github"></iconify-icon>
	</a>
	<a
		href="https://www.linkedin.com/in/vitormisumi"
		aria-label="LinkedIn"
		style:view-transition-name="linkedin">
		<iconify-icon icon="mdi:linkedin"></iconify-icon>
	</a>
</div>

<style>
	.content :global {
		ul {
			list-style: disc;
			font-family: 'JetBrains Mono', monospace;
			font-weight: 100;
			font-size: 0.875rem;
			margin-left: 1.5rem;
			margin-top: 1rem;
		}
		@media (orientation: landscape) {
			ul {
				font-size: 1rem;
			}
		}
	}
</style>
