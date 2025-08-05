<script lang="ts">
	import { page } from '$app/state';
	import * as Carousel from '$lib/components/ui/carousel';
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();

	let imageLoading = $state(false);
</script>

<Carousel.Root
	class={project.images_frame === 'mobile'
		? 'aspect-[0.46] h-[50vh] justify-self-center landscape:h-[60vh] landscape:md:h-[50vh]'
		: 'aspect-[1.6] landscape:w-[25vw] landscape:lg:w-[30vw]'}>
	<Carousel.Content>
		{#each project.images as image (image.id)}
			<Carousel.Item>
				<img
					src="https://directus.vitormisumi.com/assets/{image.directus_files_id}?width={project.images_frame ===
					'mobile'
						? 400
						: 800}&format=auto"
					onloadstart={() => (imageLoading = true)}
					onload={() => (imageLoading = false)}
					alt={page.params.lang === 'pt' ? 'Screenshot do projeto' : 'Screenshot of project'}
					class="rounded-lg border p-2 bg-secondary" />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="left-4" />
	<Carousel.Next class="right-4" />
</Carousel.Root>
