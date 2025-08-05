<script lang="ts">
	import { page } from '$app/state';
	import * as Carousel from '$lib/components/ui/carousel';
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

<Carousel.Root
	class={project.images_frame === 'mobile'
		? 'aspect-[0.46] h-[50vh] justify-self-center landscape:h-[60vh] landscape:md:h-[50vh]'
		: 'aspect-[1.6] landscape:w-[25vw] landscape:lg:w-[30vw]'}>
	<Carousel.Content>
		{#each project.images as image (image.id)}
			<Carousel.Item>
				<img
					src="https://directus.vitormisumi.com/assets/{image.directus_files_id}?width=600&format=auto"
					alt={page.params.lang === 'pt' ? 'Screenshot do projeto' : 'Screenshot of project'}
					class="rounded-lg border p-2" />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="left-4" />
	<Carousel.Next class="right-4" />
</Carousel.Root>
