<script lang="ts">
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();

	let pageLoaded = $state(false);
	let duration = $state(0);
	let codeImageDelay = $state(0);
	let profileImageDelay = $state(0);
	let textDelay = $state(0);
	let projectsDelay = $state(0);

	let selectedImageIndex = $state(0);
	let selectedImageId = $derived(data.home.images[selectedImageIndex].id);

	onMount(() => {
		if ($navigating) {
			duration = 0;
			codeImageDelay = 0;
			profileImageDelay = 0;
			textDelay = 0;
			projectsDelay = 0;
		} else {
			// duration = 1500;
			// codeImageDelay = 6000;
			// profileImageDelay = 1500;
			// textDelay = 3000;
			// projectsDelay = 4500;
		}
		pageLoaded = true;

		setInterval(() => {
			if (selectedImageIndex === data.home.images.length - 1) {
				selectedImageIndex = 0;
			} else {
				selectedImageIndex += 1;
			}
		}, 5000);
	});
</script>

{#if pageLoaded}
	<div
		class="fixed top-0 -z-10 flex h-screen w-full flex-col items-center justify-evenly landscape:flex-row">
		<div class="flex h-44 w-full max-w-lg flex-col justify-end lg:h-72">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p
						class="w-full translate-x-9 pl-5 text-xs text-accent lg:pl-0 lg:text-base landscape:translate-x-10">
						{data.home.translations[0].welcome_message}
					</p>
					<svg width="100%" class="absolute -z-10 h-8 text-4xl uppercase lg:h-12 lg:text-6xl">
						<text
							x="50%"
							y="48%"
							text-anchor="middle"
							dominant-baseline="central"
							font-family="Roboto Mono"
							font-weight="bold"
							fill="#F74C03"
							stroke="#F74C03"
							stroke-width="1">
							{data.home.name}
						</text>
					</svg>
					<svg width="100%" class="h-8 text-4xl uppercase lg:h-12 lg:text-6xl">
						<text
							x="50%"
							y="48%"
							text-anchor="middle"
							dominant-baseline="central"
							font-family="Roboto Mono"
							font-weight="bold"
							fill="none"
							stroke="#F74C03"
							stroke-width="1">
							{data.home.name}
						</text>
					</svg>
				</div>
				<img
					src="https://directus.vitormisumi.com/assets/{data.home.profile_image
						.id}?width=300&format=auto"
					alt={data.home.name}
					class="absolute -z-10 h-full shadow-secondary drop-shadow-[0_0_4px_rgba(255,252,242,0.2)]"
					in:fly={{ x: 500, duration: duration, delay: profileImageDelay }} />
			</div>
			<p
				class="text-center text-xs font-extralight tracking-tight text-primary lg:text-lg lg:tracking-wide"
				in:fade={{ duration: duration, delay: textDelay }}>
				{data.home.translations[0].subtitle}
			</p>
		</div>
		<div class="relative">
			<div
				class="grid h-48 w-full max-w-xs rounded-lg border border-[#333333] bg-[#0B0F10] shadow-2xl shadow-primary/10 lg:h-72 lg:max-w-lg"
				in:fade={{ delay: projectsDelay }}>
				{#each data.home.images as image}
					{#if image.id === selectedImageId}
						<div class="overflow-hidden p-4">
							<img
								src="https://directus.vitormisumi.com/assets/{image.directus_files_id}"
								alt="Projetos"
								class="rounded-md" />
						</div>
					{/if}
				{/each}
			</div>
			<div class="absolute flex w-full justify-center gap-2 py-2">
				{#each data.home.images as image, i}
					<button
						class="rounded-full bg-secondary transition-all hover:bg-primary disabled:bg-primary {image.id ===
						selectedImageId
							? 'h-2 w-5'
							: 'size-2'}"
						disabled={image.id === selectedImageId}
						onclick={() => (selectedImageIndex = i)}></button>
				{/each}
			</div>
		</div>
		<img
			src="https://directus.vitormisumi.com/assets/{data.home.bg_image.id}"
			alt="Linhas de código"
			class="absolute left-0 top-12 -z-20 rounded-none opacity-10 lg:left-12 lg:h-4/5"
			in:fade={{ delay: codeImageDelay }} />
	</div>
{/if}
