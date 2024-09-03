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
		class="bg-gradient-to-b from-[#05090A] to-transparent p-4 lg:p-8"
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
					class="font-roboto text-base font-medium uppercase landscape:text-xl"
					onclick={() => (showMenu = false)}>
					{data.home.name}
				</a>
				<nav
					class="flex w-1/2 flex-col justify-around gap-2 font-jet text-sm landscape:flex-row landscape:text-base">
					<a
						href="/{lang}/about"
						class={route === 'about' ? 'underline underline-offset-4' : ''}
						onclick={() => (showMenu = false)}>
						{lang === 'pt' ? 'Sobre mim' : 'About me'}
					</a>
					<a
						href="/{lang}/projects"
						class={route === 'projects' ? 'underline underline-offset-4' : ''}
						onclick={() => (showMenu = false)}>{lang === 'pt' ? 'Projetos' : 'Projects'}</a>
					<a
						href="/{lang}/contact"
						class={route === 'contact' ? 'underline underline-offset-4' : ''}
						onclick={() => (showMenu = false)}>{lang === 'pt' ? 'Contato' : 'Contacts'}</a>
				</nav>
				<div class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
					<a href="/pt/{route}" class="pr-2" onclick={() => (showMenu = false)}>PT</a>
					<a href="/en/{route}" class="pl-2" onclick={() => (showMenu = false)}>EN</a>
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
		<main
			class={showMenu
				? 'pointer-events-none opacity-5 transition-colors'
				: 'p-6 opacity-100 md:p-8 landscape:p-24 landscape:lg:px-32'}
			in:fly={{ y: 200, delay: 400 }}
			out:fly={{ y: -200 }}>
			{@render children()}
		</main>
	{/key}
	<footer
		class="fixed bottom-0 left-0 overflow-hidden whitespace-nowrap border-t border-secondary py-3"
		in:fly={{ y: 100, delay: 4500, duration: 1000 }}>
		<div class="relative w-screen">
			<div
				class="absolute left-0 top-0 z-50 h-full w-1/12 bg-gradient-to-r from-background via-background via-25% to-transparent">
			</div>
			<ul class="inline-block w-max animate-infinite-scroll text-lg text-secondary">
				{#each data.technologies as technology}
					<li class="mx-8 inline h-16 md:mx-16 lg:mx-20">
						<i class="devicon-{technology.name}-plain"></i>
					</li>
				{/each}
			</ul>
			<ul
				class="inline-block w-max animate-infinite-scroll text-lg text-secondary"
				aria-hidden="true">
				{#each data.technologies as technology}
					<li class="mx-8 inline h-16 md:mx-16 lg:mx-20">
						<i class="devicon-{technology.name}-plain"></i>
					</li>
				{/each}
			</ul>
			<div
				class="absolute right-0 top-0 z-50 h-full w-1/12 bg-gradient-to-l from-background via-background via-25% to-transparent">
			</div>
		</div>
	</footer>
{/if}
