<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';

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
		in:fly={{ y: -100, delay: 6000, duration: 1000 }}>
		<button class="text-secondary landscape:hidden" onclick={toggleMenu}>
			<iconify-icon icon="mdi:menu"></iconify-icon>
		</button>
		{#if showMenu || innerWidth > innerHeight}
			<div
				class="flex w-full flex-col items-start justify-between gap-4 text-nowrap landscape:flex-row landscape:items-center"
				transition:slide>
				<a
					href="/{lang}"
					class="font-roboto text-base font-medium uppercase text-secondary landscape:text-xl">
					{data.home.name}
				</a>
				<nav
					class="flex w-1/2 flex-col justify-around gap-2 font-jet text-sm text-secondary landscape:flex-row landscape:text-base">
					<a href="/{lang}/about" class={route === 'about' ? 'underline underline-offset-4' : ''}>
						Sobre mim
					</a>
					<a
						href="/{lang}/projects"
						class={route === 'projects' ? 'underline underline-offset-4' : ''}>Projetos</a>
					<a
						href="/{lang}/contact"
						class={route === 'contact' ? 'underline underline-offset-4' : ''}>Contato</a>
				</nav>
				<div class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
					<a href="/pt/{route}" class="pr-2">PT</a>
					<a href="/en/{route}" class="pl-2">EN</a>
				</div>
			</div>
		{/if}
	</header>
	{#key data.url}
		<div in:fly={{ y: 500, delay: 400 }} out:fly={{ y: -500 }}>
			{@render children()}
		</div>
	{/key}
	<footer
		class="fixed bottom-0 left-0 flex w-full items-center border-t border-primary text-2xl text-primary"
		in:fly={{ y: 100, delay: 6000, duration: 1000 }}>
		<a href={data.home.github} class="flex items-center border-r px-3 py-2 lg:px-8 lg:py-4">
			<iconify-icon icon="mdi:github"></iconify-icon>
		</a>
		<a href={data.home.linkedin} class="flex items-center border-r px-3 py-2 lg:px-8 lg:py-4">
			<iconify-icon icon="mdi:linkedin"></iconify-icon>
		</a>
		<ul class="flex w-full items-center justify-around text-xl text-secondary">
			{#each data.technologies as technology}
				<li>
					<i class="devicon-{technology.name}-plain"></i>
				</li>
			{/each}
		</ul>
	</footer>
{/if}
