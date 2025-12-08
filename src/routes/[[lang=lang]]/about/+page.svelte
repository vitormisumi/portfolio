<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import Slideshow from './Slideshow.svelte';

	let { data } = $props();

	let selectedSection = $state(data.about_sections[0]);
</script>

<section
	class="flex flex-col items-center gap-4 md:gap-8 landscape:grid landscape:grid-cols-4 landscape:items-start landscape:gap-8">
	<nav class="max-h-96 w-full max-w-xl landscape:max-w-full">
		<ul class="flex gap-6 overflow-x-auto font-mono text-xs landscape:flex-col landscape:text-base">
			{#each data.about_sections as section}
				<li>
					<button
						class="hover:text-accent list-item cursor-pointer text-left {section.id ===
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
		{#key selectedSection}
			<article
				class="flex h-[80vh] max-w-xl flex-col place-items-center gap-4 landscape:grid landscape:max-w-full landscape:grid-cols-2 landscape:place-items-start landscape:gap-8"
				aria-labelledby="article-title"
				in:fade>
				<div
					class="flex flex-col gap-4 overflow-auto mask-b-from-80% landscape:max-h-[50vh] {selectedSection
						.images.length
						? ''
						: 'landscape:col-span-2'}">
					<h2 id="article-title">{selectedSection.translations[0].section_title}</h2>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<div
						class="pb-16 landscape:pb-24"
						tabindex="0"
						role="region"
						aria-label={page.params.lang === 'pt' ? 'Texto rolável' : 'Scrollable text'}>
						{@html selectedSection.translations[0].section_text}
					</div>
				</div>
				<Slideshow {selectedSection} />
			</article>
		{/key}
	</div>
</section>
