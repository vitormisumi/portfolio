<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let { children, data } = $props();

	let lang = $derived.by(() => {
		if ($page.url.pathname.split('/').length > 2) {
			return $page.url.pathname.split('/')[1];
		}
		return 'pt';
	});

	let route = $derived.by(() => {
		if ($page.url.pathname.split('/').length > 2) {
			return $page.url.pathname.split('/')[2];
		}
		return '';
	});

	let pageLoaded = $state(false);

	onMount(() => {
		pageLoaded = true;
	});

	let showMenu = $state(false);

	function toggleMenu() {
		showMenu = !showMenu;
	}

	let innerWidth = $state(0);
	let innerHeight = $state(0);
</script>

<svelte:window bind:innerWidth bind:innerHeight />
{#if pageLoaded}
	<header
		class="to-transparent bg-gradient-to-b from-[#05090A] p-4 lg:p-8"
		in:fly={{ y: -100, delay: 4500, duration: 1000 }}>
		<button class="text-secondary landscape:hidden" onclick={toggleMenu}>
			<iconify-icon icon="mdi:menu"></iconify-icon>
		</button>
		{#if showMenu || innerWidth > innerHeight}
			<div
				class="flex w-full flex-col items-start justify-between gap-4 text-nowrap landscape:flex-row landscape:items-center"
				transition:slide>
				<a
					href="/{lang}"
					class="font-roboto text-base font-medium uppercase text-secondary landscape:text-xl"
					onclick={() => (showMenu = false)}>
					{data.home.name}
				</a>
				<nav
					class="flex w-1/2 flex-col justify-around gap-2 font-jet text-sm text-secondary landscape:flex-row landscape:text-base">
					<a
						href="/{lang}/about"
						class={route === 'about' ? 'underline underline-offset-4' : ''}
						onclick={() => (showMenu = false)}>
						Sobre mim
					</a>
					<a
						href="/{lang}/projects"
						class={route === 'projects' ? 'underline underline-offset-4' : ''}
						onclick={() => (showMenu = false)}>Projetos</a>
					<a
						href="/{lang}/contact"
						class={route === 'contact' ? 'underline underline-offset-4' : ''}
						onclick={() => (showMenu = false)}>Contato</a>
				</nav>
				<div class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
					<a href="/pt/{route}" class="pr-2">PT</a>
					<a href="/en/{route}" class="pl-2">EN</a>
				</div>
			</div>
		{/if}
	</header>
	<img
		src="https://directus.vitormisumi.com/assets/{data.home.bg_image.id}"
		alt="Linhas de código"
		class="absolute left-0 top-12 -z-20 rounded-none opacity-5 lg:left-12 lg:h-4/5"
		in:fade={{ delay: 4500 }} />
	{#key data.url}
		<div
			class={showMenu ? 'pointer-events-none opacity-5 transition-colors' : 'opacity-100'}
			in:fly={{ y: 500, delay: 400 }}
			out:fly={{ y: -500 }}>
			{@render children()}
		</div>
	{/key}
	<footer
		class="fixed bottom-0 left-0 flex w-full items-center border-t border-primary text-2xl text-primary/80"
		in:fly={{ y: 100, delay: 4500, duration: 1000 }}>
		{#each data.profiles as profile}
			<div class="border-r">
				<a
					href={profile.link}
					class="flex items-center px-3 py-2 hover:text-primary lg:px-8 lg:py-4">
					<iconify-icon icon={profile.icon}></iconify-icon>
				</a>
			</div>
		{/each}
		<ul class="flex w-full items-center justify-around overflow-hidden text-lg text-primary/10">
			{#each data.technologies as technology}
				<li>
					<i class="devicon-{technology.name}-plain"></i>
				</li>
			{/each}
		</ul>
	</footer>
{/if}
