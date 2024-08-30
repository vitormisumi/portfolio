<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let selectedProjectId = $state(data.projects[0].id);
	let selectedImageId = $state(data.projects[0].images[0].id);
	$inspect(data);
</script>

<div
	class="fixed top-0 -z-10 grid h-screen w-full grid-cols-4 place-items-center gap-20 px-40 text-secondary">
	<div class="h-full max-h-96">
		<ul class="list-disc space-y-4 font-mono">
			{#each data.projects as project, i}
				<li class="hover:text-accent">
					<button
						class="list-item text-left {project.id === selectedProjectId
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
	<div class="col-span-3 h-full max-h-96 w-full">
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
					<div class="flex gap-12">
						<p class="w-full">{project.translations[0].description}</p>
						<div>
							{#each project.images as image, i}
								{#if image.id === selectedImageId}
									<div class="flex translate-x-10 items-center justify-between gap-2">
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
												class="h-96 w-44 rounded-2xl border-4 border-[#000] bg-cover shadow-sm shadow-primary drop-shadow-xl"
												style:background-image={`url(https://directus.vitormisumi.com/assets/${image.directus_files_id}?width=300&format=auto`}>
											</div>
										{:else}
											<div
												class="h-60 w-96 rounded-lg border-8 border-[#000] bg-cover shadow-sm shadow-primary drop-shadow-xl"
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
