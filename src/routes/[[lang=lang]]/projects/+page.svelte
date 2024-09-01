<script lang="ts">
	import { fade } from 'svelte/transition';
	import Screen from './Screen.svelte';

	let { data } = $props();

	let selectedProjectId = $state(data.projects[0].id);
	let selectedImageId = $state(data.projects[0].images[0].id);
</script>

<section
	class="fixed top-0 -z-10 flex h-screen w-full flex-col items-center gap-4 px-6 py-16 text-secondary md:gap-8 md:px-12 md:py-20 landscape:grid landscape:grid-cols-4 landscape:place-items-center landscape:gap-8 landscape:space-y-0 landscape:lg:px-20 landscape:xl:px-28">
	<nav class="max-h-96 w-full max-w-xl landscape:h-full landscape:max-w-full">
		<ul
			class="flex justify-around gap-4 overflow-x-auto font-mono text-xs landscape:flex-col landscape:text-base">
			{#each data.projects as project, i}
				<li class="w-full">
					<button
						class="list-item max-w-32 md:max-w-44 lg:max-w-60 truncate text-left transition-colors hover:text-accent {project.id ===
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
		class="col-span-3 grid max-h-96 w-full max-w-xl place-items-center landscape:h-full landscape:max-w-full landscape:place-items-start">
		{#each data.projects as project}
			{#if project.id === selectedProjectId}
				<article
					class="flex h-[70vh] w-full flex-col justify-between gap-4 md:h-[75vh] landscape:h-[60vh] landscape:flex-row">
					<div class="landscape:max-w-xs space-y-4 landscape:md:max-w-sm" in:fade>
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
						<div class="w-full landscape:lg:min-w-96">
							{@html project.translations[0].description}
						</div>
					</div>
					<Screen {project} {data} />
				</article>
			{/if}
		{/each}
	</div>
</section>
