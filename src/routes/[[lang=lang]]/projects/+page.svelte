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
						class="list-item max-w-32 truncate text-left transition-colors hover:text-accent md:max-w-44 lg:max-w-60 {project.id ===
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
	<div
		class="col-span-3 grid w-full max-w-xl place-items-center landscape:max-w-full landscape:place-items-start">
		{#key selectedProject}
			<article
				class="grid w-full max-w-lg place-items-start gap-4 landscape:max-w-full landscape:grid-cols-2 landscape:gap-8"
				in:fade>
				<div class="grid w-full gap-4">
					<div>
						<a href={selectedProject.link} class="font-roboto text-lg font-medium text-primary"
							>{selectedProject.translations[0].title}</a>
						<h3 class="font-mono text-xs font-thin capitalize text-secondary">
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
					<div class="max-h-[25vh] w-full landscape:max-h-[50vh]">
						{@html selectedProject.translations[0].description}
					</div>
				</div>
				<Screen project={selectedProject} />
			</article>
		{/key}
	</div>
</section>
