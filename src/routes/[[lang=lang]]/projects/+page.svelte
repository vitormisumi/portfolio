<script lang="ts">
	import { fade } from 'svelte/transition';
	import Screen from './Screen.svelte';

	let { data } = $props();

	let selectedProjectId = $state(data.projects[0].id);
	let selectedImageId = $state(data.projects[0].images[0].id);
</script>

<div
	class="fixed top-0 -z-10 flex h-screen w-full flex-col gap-4 space-y-8 px-4 py-20 text-secondary md:px-12 landscape:grid landscape:grid-cols-4 landscape:place-items-center landscape:gap-8 landscape:space-y-0 landscape:lg:px-20 landscape:xl:px-40">
	<nav class="max-h-96 w-full landscape:h-full">
		<ul
			class="flex justify-around overflow-x-auto font-mono text-xs landscape:inline landscape:space-x-0 landscape:space-y-4 landscape:text-base">
			{#each data.projects as project, i}
				<li>
					<button
						class="list-item text-left transition-colors hover:text-accent {project.id ===
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
	<div class="col-span-3 max-h-96 w-full landscape:h-full">
		{#each data.projects as project}
			{#if project.id === selectedProjectId}
				<article class="flex w-full flex-col justify-between gap-4 landscape:flex-row">
					<div class="space-y-4" in:fade>
						<div>
							<h2>{project.translations[0].title}</h2>
							<h3 class="font-mono text-xs font-thin capitalize">
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
						<div class="w-full">
							{@html project.translations[0].description}
						</div>
					</div>
					<Screen {project} {selectedProjectId} {selectedImageId} {data} />
				</article>
			{/if}
		{/each}
	</div>
</div>
