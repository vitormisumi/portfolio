<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let selectedSectionId = $state(data.about_sections[0].id);
</script>

<div
	class="fixed top-0 -z-10 grid h-screen w-full grid-cols-4 place-items-center px-40 text-secondary">
	<div class="h-full max-h-96 w-full">
		<ul class="list-disc space-y-4 font-mono">
			{#each data.about_sections as section}
				<li>
					<button
						class="list-item text-left transition-colors hover:text-accent {section.id ===
						selectedSectionId
							? 'underline underline-offset-4'
							: ''}"
						onclick={() => (selectedSectionId = section.id)}>
						{section.translations[0].section_title}
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="col-span-3 h-full max-h-96 w-full">
		{#each data.about_sections as section}
			{#if section.id === selectedSectionId}
				<div class="space-y-4" in:fade>
					<h2 class="font-roboto text-primary">{section.translations[0].section_title}</h2>
					<div class="grid max-h-96 grid-cols-2 overflow-y-scroll">
						<div class="w-full">
							{@html section.translations[0].section_text}
						</div>
						<img
							src="https://directus.vitormisumi.com/assets/{section.section_image}?width=400&format=auto"
							alt={section.translations[0].image_alt} />
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
