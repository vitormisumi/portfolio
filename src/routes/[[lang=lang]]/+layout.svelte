<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let { children, data } = $props();

	let lang: string = $derived($page.url.pathname.startsWith('/en') ? 'en' : 'pt');

	$effect(() => {
		document.documentElement.lang = lang;
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
<div class="flex h-dvh flex-col justify-between overflow-hidden">
	{#if pageLoaded}
		<header
			class="bg-gradient-to-b from-[#05090A] to-transparent p-4 lg:p-8 lg:px-12"
			in:fly={{ y: -100, delay: 4500, duration: 1000 }}>
			<button
				class="text-secondary landscape:hidden"
				aria-label={$page.params.lang === 'pt' ? 'Menu de navegação' : 'Navigation menu'}
				aria-expanded={showMenu || innerWidth > innerHeight ? 'true' : 'false'}
				aria-hidden={innerWidth > innerHeight ? 'true' : 'false'}
				aria-controls="primaryNav"
				onclick={toggleMenu}>
				<iconify-icon icon="mdi:menu"></iconify-icon>
			</button>
			{#if showMenu || innerWidth > innerHeight}
				<nav
					id="primaryNav"
					class="flex w-full flex-col items-start justify-between gap-4 text-nowrap landscape:flex-row landscape:items-center {showMenu
						? 'fixed'
						: ''}"
					transition:slide>
					<a
						href="/{lang}"
						class="font-roboto text-base font-medium uppercase landscape:text-xl"
						onclick={() => (showMenu = false)}>
						{data.home.name}
					</a>
					<div
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
					</div>
					<div class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
						<a
							href="/pt/{route}"
							lang="pt"
							aria-label="Mudar para Português"
							aria-current={$page.params.lang === 'pt' ? 'true' : 'false'}
							class="pr-2"
							onclick={() => (showMenu = false)}>PT</a>
						<a
							href="/en/{route}"
							lang="en"
							aria-label="Change to English"
							aria-current={$page.params.lang === 'en' ? 'true' : 'false'}
							class="pl-2"
							onclick={() => (showMenu = false)}>EN</a>
					</div>
				</nav>
			{/if}
		</header>
		<img
			src="https://directus.vitormisumi.com/assets/{data.home.bg_image.id}"
			alt={$page.params.lang === 'pt' ? 'Linhas de código' : 'Code lines'}
			class="absolute left-0 top-12 -z-20 rounded-none opacity-5 lg:left-12 lg:h-4/5 {showMenu
				? 'hidden'
				: ''}"
			in:fade={{ delay: 4500 }} />
		{#key data.url}
			<main
				class="h-full overflow-hidden p-6 opacity-100 md:p-8 landscape:lg:p-24 landscape:xl:px-32 {showMenu
					? 'pointer-events-none opacity-5 transition-colors'
					: ''}"
				in:fade>
				{@render children()}
			</main>
		{/key}
		<footer
			class="flex items-center overflow-hidden whitespace-nowrap border-t border-secondary py-2 md:py-4"
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
</div>
