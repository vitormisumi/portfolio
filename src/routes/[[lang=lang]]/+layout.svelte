<script lang="ts">
	import { page } from '$app/state';
	import { mode, toggleMode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';

	let { children, data } = $props();

	let lang: string = $derived(page.url.pathname.startsWith('/en') ? 'en' : 'pt');

	$effect(() => {
		document.documentElement.lang = lang;
	});

	let route = $derived.by(() => {
		if (page.url.pathname.split('/').length > 2) {
			return page.url.pathname.split('/')[2];
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
<svelte:head>
	<title>Vitor Misumi</title>
	<meta
		name="description"
		content={lang === 'pt'
			? 'Portfólio do desenvolvedor web Vitor Misumi'
			: 'Portfolio of the web developer Vitor Misumi'} />
</svelte:head>
<div class="relative flex h-dvh flex-col justify-between overflow-hidden">
	{#if pageLoaded}
		<header
			class="bg-linear-to-b from-dark/10 to-transparent px-6 py-4 dark:from-light/5 landscape:py-2 landscape:lg:px-12 landscape:lg:py-8"
			in:fly={{ y: -100, delay: 4500, duration: route ? 0 : 1000 }}>
			<button
				class="text-secondary landscape:hidden"
				aria-label={page.params.lang === 'pt' ? 'Menu de navegação' : 'Navigation menu'}
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
						class="flex w-1/2 flex-col justify-around gap-2 text-sm landscape:flex-row landscape:text-base">
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
							onclick={() => (showMenu = false)}>{lang === 'pt' ? 'Contato' : 'Contact'}</a>
					</div>
					<div class="flex flex-col gap-4 landscape:flex-row landscape:gap-8">
						<button
							class="flex aspect-square size-8 rounded-sm p-2 hover:bg-secondary hover:text-light dark:hover:text-dark"
							aria-label={mode.current === 'dark' ? 'dark mode' : 'light mode'}
							onclick={toggleMode}>
							<iconify-icon
								icon={mode.current === 'dark' ? 'ic:round-dark-mode' : 'ic:round-light-mode'}
							></iconify-icon>
						</button>
						<div
							class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
							<a
								href="/pt/{route}"
								lang="pt"
								aria-label="Mudar para Português"
								aria-current={page.params.lang === 'pt' ? 'true' : 'false'}
								class="pr-2"
								onclick={() => (showMenu = false)}>PT</a>
							<a
								href="/en/{route}"
								lang="en"
								aria-label="Change to English"
								aria-current={page.params.lang === 'en' ? 'true' : 'false'}
								class="pl-2"
								onclick={() => (showMenu = false)}>EN</a>
						</div>
					</div>
				</nav>
			{/if}
		</header>
		<img
			src="https://directus.vitormisumi.com/assets/{mode.current === 'dark'
				? data.home.dark_bg_image.id
				: data.home.bg_image.id}?width=600&format=auto"
			alt={page.params.lang === 'pt' ? 'Linhas de código' : 'Code lines'}
			class="absolute left-0 top-16 -z-20 opacity-10 lg:left-12 lg:h-4/5 {showMenu ? 'hidden' : ''}"
			in:fade={{ delay: 4500 }} />
		{#key data.url}
			<main
				class="h-full overflow-hidden p-6 opacity-100 transition-opacity md:p-8 landscape:lg:p-24 landscape:xl:px-32 {showMenu
					? 'pointer-events-none opacity-5'
					: ''}"
				in:fade>
				{@render children()}
			</main>
		{/key}
		<footer
			class="flex items-center overflow-hidden whitespace-nowrap border-t border-secondary"
			in:fly={{ y: 100, delay: 4500, duration: route ? 0 : 1000 }}>
			<div class="relative flex w-screen items-center py-3 md:py-4 lg:py-6">
				<div
					class="absolute left-0 top-0 z-50 h-full w-1/12 bg-linear-to-r from-light via-light via-25% to-transparent transition-colors dark:from-dark dark:via-dark">
				</div>
				<ul class="inline-flex w-max animate-infinite-scroll text-secondary">
					{#each data.technologies as technology}
						<li class="mx-8 inline-flex md:mx-16 lg:mx-20">
							<iconify-icon
								icon="simple-icons:{technology.name}"
								class="inline-block size-4"
								noobserver></iconify-icon>
						</li>
					{/each}
				</ul>
				<ul class="inline-flex w-max animate-infinite-scroll text-secondary" aria-hidden="true">
					{#each data.technologies as technology}
						<li class="mx-8 inline-flex md:mx-16 lg:mx-20">
							<iconify-icon
								icon="simple-icons:{technology.name}"
								class="inline-block size-4"
								noobserver></iconify-icon>
						</li>
					{/each}
				</ul>
				<div
					class="absolute right-0 top-0 z-50 h-full w-1/12 bg-linear-to-l from-light via-light via-25% to-transparent transition-colors dark:from-dark dark:via-dark">
				</div>
			</div>
		</footer>
	{/if}
</div>
