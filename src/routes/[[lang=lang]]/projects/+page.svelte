<script lang="ts">
	let { data } = $props();
</script>

<div class="text-secondary">
	{#each data.projects as project}
		<h2>{project.translations[0].title}</h2>
		<p>{project.translations[0].description}</p>
	{/each}
</div>
