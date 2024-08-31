<script lang="ts">
	import type { Project } from '$lib/types';
	import type { PageData } from './$types';

	let {
		selectedImageId,
		selectedProjectId,
		project,
		data
	}: { selectedImageId: number; selectedProjectId: number; project: Project; data: PageData } =
		$props();

	function previousImage(i: number) {
		if (i > 0) {
			selectedImageId =
				data.projects.find((project) => project.id === selectedProjectId)?.images[i - 1].id ?? 0;
		}
	}

	function nextImage(i: number) {
		if (i < project.images.length) {
			selectedImageId =
				data.projects.find((project) => project.id === selectedProjectId)?.images[i + 1].id ?? 0;
		}
	}
</script>

{#each project.images as image, i}
	{#if image.id === selectedImageId}
		<figure
			class="relative flex items-center justify-between place-self-center overflow-hidden border-[#000] shadow-sm shadow-primary drop-shadow-xl {project.images_frame ===
			'mobile'
				? 'aspect-[0.46] h-[50vh] w-fit rounded-2xl border-4'
				: 'aspect-[1.6] w-full min-w-[25vw] rounded-lg border-8'}">
			<img
				src="https://directus.vitormisumi.com/assets/{image.directus_files_id}?width={project.images_frame ===
				'mobile'
					? '300'
					: '600'}&format=auto"
				alt=""
				class="absolute inset-0" />
			<button
				class="size-8 rounded-full bg-primary/25 transition-colors hover:bg-primary disabled:opacity-25"
				disabled={i === 0}
				onclick={() => previousImage(i)}>
				←
			</button>
			<button
				class="size-8 rounded-full bg-primary/25 transition-colors hover:bg-primary disabled:opacity-25"
				disabled={i === project.images.length - 1}
				onclick={() => nextImage(i)}>
				→
			</button>
		</figure>
	{/if}
{/each}
