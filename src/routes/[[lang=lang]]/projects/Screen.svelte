<script lang="ts">
	import { page } from '$app/state';
	import type { Project } from '$lib/types';
	import { fly } from 'svelte/transition';

	let { project }: { project: Project } = $props();

	let selectedImageIndex = $state(0);
	let selectedImage = $derived(project.images[selectedImageIndex]);
	let scrollDirection: 'forward' | 'backward' = $state('forward');

	function previousImage(i: number) {
		if (i > 0) {
			selectedImageIndex--;
			scrollDirection = 'forward';
		}
	}

	function nextImage(i: number) {
		if (i < project.images.length) {
			selectedImageIndex++;
			scrollDirection = 'backward';
		}
	}
</script>

<div aria-roledescription="carousel" role="region" class="grid w-full">
	<figure
		class="shadow-dark relative flex items-center justify-between overflow-hidden border-secondary shadow-sm drop-shadow-xl {project.images_frame ===
		'mobile'
			? 'aspect-[0.46] h-[50vh] justify-self-center rounded-2xl border-4 landscape:h-[60vh] landscape:md:h-[50vh]'
			: 'aspect-[1.6] rounded-lg border-8 landscape:w-[25vw] landscape:lg:w-[30vw]'}">
		{#key selectedImage}
			<img
				src="https://directus.vitormisumi.com/assets/{selectedImage.directus_files_id}?width={project.images_frame ===
				'mobile'
					? '300'
					: '900'}&format=auto"
				alt={page.params.lang === 'pt' ? 'Screenshot do projeto' : 'Screenshot of project'}
				role="group"
				aria-roledescription="slide"
				aria-labelledby={String(selectedImage.id)}
				class="absolute inset-0 -z-10 w-full"
				in:fly={{ x: scrollDirection === 'forward' ? -500 : 500 }}
				out:fly={{ x: scrollDirection === 'forward' ? 500 : -500 }} />
		{/key}
		<button
			class="bg-dark/25 hover:bg-dark flex size-8 items-center justify-center rounded-full disabled:opacity-10"
			disabled={selectedImageIndex === 0}
			onclick={() => previousImage(selectedImageIndex)}>
			<iconify-icon icon="ep:arrow-left"></iconify-icon>
		</button>
		<button
			class="bg-dark/25 hover:bg-dark flex size-8 items-center justify-center rounded-full disabled:opacity-10"
			disabled={selectedImageIndex === project.images.length - 1}
			onclick={() => nextImage(selectedImageIndex)}>
			<iconify-icon icon="ep:arrow-right"></iconify-icon>
		</button>
	</figure>
</div>
