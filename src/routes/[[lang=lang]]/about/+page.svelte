<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, blur } from 'svelte/transition';

	let { data } = $props();

	let selectedSection = $state(data.about_sections[0]);

	let currentImageIndex = $state(0);
	let currentImage = $derived(selectedSection.images[currentImageIndex]);

	function imageSlideshow() {
		setInterval(() => {
			if (currentImageIndex === selectedSection.images.length - 1) {
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

<section
	class="flex flex-col items-center gap-4 md:gap-8 landscape:grid landscape:grid-cols-4 landscape:items-start landscape:gap-8">
	<nav class="max-h-96 w-full max-w-xl landscape:max-w-full">
		<ul class="flex gap-6 overflow-x-auto font-mono text-xs landscape:flex-col landscape:text-base">
			{#each data.about_sections as section}
				<li>
					<button
						class="list-item text-left transition-colors hover:text-accent {section.id ===
						selectedSection.id
							? 'underline underline-offset-4'
							: ''}"
						onclick={() => (selectedSection = section)}>
						{section.translations[0].section_title}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="col-span-3 flex w-full justify-center">
		{#each data.about_sections as section}
			{#if section.id === selectedSection.id}
				<article
					class="grid max-w-lg place-items-center gap-4 landscape:max-w-full landscape:grid-cols-2 landscape:place-items-start landscape:gap-8"
					in:fade>
					<div class="grid gap-4">
						<h2>{section.translations[0].section_title}</h2>
						<div class="relative">
							<div>
								<div
									class="absolute bottom-0 left-0 h-10 w-full bg-gradient-to-b from-transparent to-background">
								</div>
								<div class="max-h-[25vh] w-full overflow-y-auto pb-10 landscape:max-h-[50vh]">
									{@html section.translations[0].section_text}
								</div>
							</div>
						</div>
					</div>
					<div class="w-full max-w-md rounded-lg border border-secondary p-2 md:p-4 landscape:p-2 transition-transform duration-500">
						{#key currentImageIndex}
							<img
								src="https://directus.vitormisumi.com/assets/{currentImage.directus_files_id}?width=600&height=450&format=auto"
								alt=""
								class="shadow-2xl shadow-secondary/20"
								in:blur />
						{/key}
					</div>
				</article>
			{/if}
		{/each}
	</div>
</section>
