<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

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
	class="fixed top-0 -z-10 flex h-screen w-full flex-col items-center gap-4 px-6 py-16 text-secondary md:gap-8 md:px-12 md:py-20 landscape:grid landscape:grid-cols-4 landscape:place-items-center landscape:gap-8 landscape:space-y-0 landscape:lg:px-20 landscape:xl:px-28">
	<nav class="max-h-96 w-full max-w-xl landscape:h-full landscape:max-w-full">
		<ul
			class="flex justify-around overflow-x-auto font-mono text-xs landscape:inline landscape:space-x-0 landscape:space-y-4 landscape:text-base">
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
	<div
		class="col-span-3 grid max-h-96 w-full max-w-xl place-items-center landscape:h-full landscape:max-w-full landscape:place-items-start">
		{#each data.about_sections as section}
			{#if section.id === selectedSection.id}
				<article class="space-y-4" in:fade>
					<h2>{section.translations[0].section_title}</h2>
					<div class="grid gap-4 md:gap-8 landscape:grid-cols-2">
						<div class="relative">
							<div
								class="from-transparent absolute bottom-0 left-0 h-10 w-full bg-gradient-to-b to-background">
							</div>
							<div class="max-h-48 w-full overflow-y-auto pb-10 md:max-h-72 lg:max-h-96">
								{@html section.translations[0].section_text}
							</div>
						</div>
						<img
							src="https://directus.vitormisumi.com/assets/{currentImage.directus_files_id}?width=600&height=450&format=auto"
							alt=""
							class="w-full rounded-lg border p-2 md:p-4 landscape:p-2" />
					</div>
				</article>
			{/if}
		{/each}
	</div>
</section>
