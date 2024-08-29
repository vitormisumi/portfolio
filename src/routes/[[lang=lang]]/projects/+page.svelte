<script lang="ts">
	let { data } = $props();

	let selectedProject = $state(1);
</script>

<div
	class="fixed top-0 -z-10 grid h-screen w-full grid-cols-4 place-items-center text-secondary">
	<div class="h-full max-h-96">
		{#each data.projects as project}
			<button onclick={() => (selectedProject = project.id)}>
				{project.translations[0].title}
			</button>
		{/each}
	</div>
	<div class="col-span-3 h-full max-h-96">
		{#each data.projects as project}
			{#if project.id === selectedProject}
				<h2>{project.translations[0].title}</h2>
				<p>{project.translations[0].description}</p>
			{/if}
		{/each}
	</div>
</div>
