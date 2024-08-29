<script lang="ts">
	let { data } = $props();

	let selectedSection = $state(1);
</script>

<div
	class="fixed top-0 -z-10 grid h-screen w-full grid-cols-4 place-items-center content-center text-secondary landscape:flex-row">
	<div>
		{#each data.about_sections as section}
			<ul class="list-disc hover:text-accent">
				<li class="flex items-center space-x-2">
					<iconify-icon icon={section.section_icon}></iconify-icon>
					<button onclick={() => (selectedSection = section.id)}
						>{section.translations[0].section_title}</button>
				</li>
			</ul>
		{/each}
	</div>
	<div class="col-span-3">
		{#each data.about_sections as section}
			{#if section.id === selectedSection}
				<h2 class="text-center">{section.translations[0].section_title}</h2>
				<div class="grid max-h-96 grid-cols-2 overflow-y-scroll">
					<p class="text-sm">{section.translations[0].section_text}</p>
					<img
						src="https://directus.vitormisumi.com/assets/{section.section_image}?width=400"
						alt={section.translations[0].image_alt} />
				</div>
			{/if}
		{/each}
	</div>
</div>
