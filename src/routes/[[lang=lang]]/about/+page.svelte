<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let selectedSection = $state(data.about_sections[0]);
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

	let imageLoaded = $state(false);
</script>

<section
	class="flex flex-col items-center gap-4 md:gap-8 landscape:grid landscape:grid-cols-4 landscape:items-start landscape:gap-8">
	<nav class="max-h-96 w-full max-w-xl landscape:max-w-full">
		<ul class="flex gap-6 overflow-x-auto font-mono text-xs landscape:flex-col landscape:text-base">
			{#each data.about_sections as section}
				<li>
					<button
						class="list-item text-left hover:text-accent {section.id === selectedSection.id
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
		{#key selectedSection}
			<article
				class="grid max-w-lg place-items-center gap-4 landscape:max-w-full landscape:grid-cols-2 landscape:place-items-start landscape:gap-8"
				aria-labelledby="article-title"
				in:fade>
				<div class="grid gap-4 {selectedSection.images.length ? '' : 'landscape:col-span-2'}">
					<h2 id="article-title">{selectedSection.translations[0].section_title}</h2>
					<div class="relative">
						<div>
							<div
								class="to-light dark:to-dark pointer-events-none absolute bottom-0 left-0 h-10 w-full bg-gradient-to-b from-transparent">
							</div>
							<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
							<div
								class="w-full overflow-y-auto pb-10 landscape:max-h-[50vh] {selectedSection.images
									.length
									? 'max-h-[25vh]'
									: 'max-h-[65vh]'}"
								tabindex="0"
								role="region"
								aria-label={$page.params.lang === 'pt' ? 'Texto rolável' : 'Scrollable text'}>
								{@html selectedSection.translations[0].section_text}
							</div>
						</div>
					</div>
				</div>
				{#if selectedSection.images.length}
					<figure class="grid">
						{#key currentImageIndex}
							<img
								src="https://directus.vitormisumi.com/assets/{currentImage.directus_files_id}?width=600&height=450&format=auto"
								alt={$page.params.lang === 'pt'
									? 'Vitor trabalhando com futebol'
									: 'Vitor working with football'}
								class="col-start-1 row-start-1 rounded-lg border border-secondary p-2 shadow-2xl shadow-secondary/20 md:p-4 landscape:p-2"
								onload={() => (imageLoaded = true)}
								transition:fade={{ duration: 1000 }} />
						{/key}
						{#if !imageLoaded}
							<div class="w-[512px]" aria-hidden="true"></div>
						{/if}
					</figure>
				{/if}
			</article>
		{/key}
	</div>
</section>
