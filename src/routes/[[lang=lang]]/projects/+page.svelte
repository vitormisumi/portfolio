<script lang="ts">
	import { fade } from 'svelte/transition';
	import Screen from './Screen.svelte';

	let { data } = $props();

	let selectedProjectId = $state(data.projects[0].id);
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
						selectedProjectId
							? 'underline underline-offset-4'
							: ''}"
						onclick={() => {
							selectedProjectId = project.id;
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
		{#each data.projects as project}
			{#if project.id === selectedProjectId}
				<article
					class="grid max-w-lg gap-4 landscape:max-w-full w-full landscape:grid-cols-2 landscape:gap-8 place-items-start"
					in:fade>
					<div class="grid gap-4 w-full">
						<div>
							<h2>{project.translations[0].title}</h2>
							<h3 class="font-mono text-xs font-thin capitalize text-secondary">
								<time datetime={project.start_date}>
									{new Date(project.start_date)
										.toLocaleDateString(project.translations[0].languages_code, {
											year: '2-digit',
											month: 'short'
										})
										.replace('. de', '')}
								</time>
								→
								<time datetime={project.end_date}>
									{new Date(project.end_date)
										.toLocaleDateString(project.translations[0].languages_code, {
											year: '2-digit',
											month: 'short'
										})
										.replace('. de', '')}
								</time>
							</h3>
						</div>
						<div class="max-h-[25vh] w-full landscape:max-h-[50vh]">
							{@html project.translations[0].description}
						</div>
					</div>
					<Screen {project} {data} />
				</article>
			{/if}
		{/each}
	</div>
</section>
