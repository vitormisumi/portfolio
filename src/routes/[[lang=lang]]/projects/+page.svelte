<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let selectedProjectId = $state(data.projects[0].id);
	let selectedImageId = $state(data.projects[0].images[0].id);
</script>

<div
	class="fixed top-0 -z-10 flex h-screen w-full flex-col space-y-8 px-4 py-20 text-secondary landscape:grid landscape:grid-cols-4 landscape:place-items-center landscape:space-y-0 landscape:px-40">
	<div class="max-h-96 w-full landscape:h-full">
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
	</div>
	<div class="col-span-3 max-h-96 w-full landscape:h-full">
		{#each data.projects as project}
			{#if project.id === selectedProjectId}
				<div class="space-y-4" in:fade>
					<div class="flex justify-between">
						<h2>{project.translations[0].title}</h2>
						<p class="font-thin capitalize">
							{new Date(project.start_date)
								.toLocaleDateString(project.translations[0].languages_code, {
									year: '2-digit',
									month: 'short'
								})
								.replace('. de', '')} -> {new Date(project.end_date)
								.toLocaleDateString(project.translations[0].languages_code, {
									year: '2-digit',
									month: 'short'
								})
								.replace('. de', '')}
						</p>
					</div>
					<div class="grid max-h-96 gap-4 landscape:flex">
						<div class="w-full">
							{@html project.translations[0].description}
						</div>
						<div>
							{#each project.images as image, i}
								{#if image.id === selectedImageId}
									<div class="flex items-center justify-between gap-2 landscape:translate-x-10">
										<button
											class="size-8 rounded-full bg-primary/50 transition-colors hover:bg-primary disabled:bg-primary/10 disabled:opacity-50"
											disabled={i === 0}
											onclick={() => {
												if (i > 0) {
													selectedImageId =
														data.projects.find((project) => project.id === selectedProjectId)
															?.images[i - 1].id ?? 0;
												}
											}}>
											←
										</button>
										{#if project.images_frame === 'mobile'}
											<div
												class="h-60 w-28 rounded-2xl border-4 border-[#000] bg-cover shadow-sm shadow-primary drop-shadow-xl landscape:h-96 landscape:w-44"
												style:background-image={`url(https://directus.vitormisumi.com/assets/${image.directus_files_id}?width=300&format=auto`}>
											</div>
										{:else}
											<div
												class="h-36 w-56 rounded-lg border-8 border-[#000] bg-cover shadow-sm shadow-primary drop-shadow-xl landscape:h-60 landscape:w-96"
												style:background-image={`url(https://directus.vitormisumi.com/assets/${image.directus_files_id}?width=600&format=auto`}>
											</div>
										{/if}
										<button
											class="size-8 rounded-full bg-primary/50 transition-colors hover:bg-primary disabled:bg-primary/10 disabled:opacity-50"
											disabled={i === project.images.length - 1}
											onclick={() => {
												if (i < project.images.length) {
													selectedImageId =
														data.projects.find((project) => project.id === selectedProjectId)
															?.images[i + 1].id ?? 0;
												}
											}}>
											→
										</button>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
