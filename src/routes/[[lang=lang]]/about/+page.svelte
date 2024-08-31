<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let selectedSectionId = $state(data.about_sections[0].id);
</script>

<div
	class="fixed top-0 -z-10 flex h-screen w-full flex-col space-y-8 px-4 py-20 text-secondary landscape:grid landscape:grid-cols-4 landscape:place-items-center landscape:space-y-0 landscape:px-40">
	<div class="max-h-96 w-full landscape:h-full">
		<ul
			class="flex justify-around overflow-x-auto font-mono text-xs landscape:inline landscape:space-x-0 landscape:space-y-4 landscape:text-base">
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
	<div class="col-span-3 max-h-96 w-full landscape:h-full">
		{#each data.about_sections as section}
			{#if section.id === selectedSectionId}
				<div class="space-y-4" in:fade>
					<h2>{section.translations[0].section_title}</h2>
					<div class="grid max-h-96 landscape:grid-cols-2 gap-4 overflow-y-scroll">
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
