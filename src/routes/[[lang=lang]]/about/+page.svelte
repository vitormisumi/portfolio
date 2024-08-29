<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let selectedSection = $state(1);
</script>

<div
	class="fixed top-0 -z-10 grid h-screen w-full grid-cols-4 place-items-center text-secondary">
	<div class="h-full max-h-96">
		{#each data.about_sections as section}
			<ul class="list-disc hover:text-accent">
				<li>
					<button onclick={() => (selectedSection = section.id)}>
						{section.translations[0].section_title}
					</button>
				</li>
			</ul>
		{/each}
	</div>
	<div class="col-span-3 h-full max-h-96">
		{#each data.about_sections as section}
			{#if section.id === selectedSection}
				<div in:fade>
					<h2 class="font-roboto text-primary">{section.translations[0].section_title}</h2>
					<div class="grid max-h-96 grid-cols-2 overflow-y-scroll">
						<div>
							{@html section.translations[0].section_text}
						</div>
						<img
							src="https://directus.vitormisumi.com/assets/{section.section_image}?width=400"
							alt={section.translations[0].image_alt} />
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
