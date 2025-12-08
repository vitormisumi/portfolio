<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { selectedSection } = $props();

	let currentImageIndex = $state(0);
	let currentImage = $derived(selectedSection.images[currentImageIndex]);

	function imageSlideshow() {
		setInterval(() => {
			if (currentImageIndex >= selectedSection.images.length - 1) {
				currentImageIndex = 0;
			} else {
				currentImageIndex += 1;
			}
		}, 5000);
	}

	onMount(() => {
		imageSlideshow();
	});
</script>

{#if selectedSection.images.length}
	<figure
		class="border-secondary shadow-secondary/20 grid rounded-lg border p-2 shadow-2xl md:p-4 landscape:p-2">
		<div class="h-full w-full"></div>
		{#key currentImageIndex}
			<img
				src="https://directus.vitormisumi.com/assets/{currentImage.directus_files_id}?width=600&height=450&format=auto"
				alt={page.params.lang === 'pt'
					? 'Vitor trabalhando com futebol'
					: 'Vitor working with football'}
				class="col-start-1 row-start-1 w-full rounded-sm"
				transition:fade={{ duration: 1000 }} />
		{/key}
	</figure>
{/if}
