<script lang="ts">
	import { browser } from '$app/environment';
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

	let darkMode = $state(false);

	function toggleTheme() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');

		showMenu = false;
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}
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
<div class="flex h-dvh flex-col justify-between overflow-hidden">
	{#if pageLoaded}
		<header
			class="from-dark/10 dark:from-light/5 bg-gradient-to-b to-transparent px-6 py-4 lg:px-12 lg:py-8"
			in:fly={{ y: -100, delay: 4500, duration: route ? 0 : 1000 }}>
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
							class="hover:text-light hover:dark:text-dark flex aspect-square size-8 rounded p-2 hover:bg-secondary"
							aria-label={darkMode ? 'dark mode' : 'light mode'}
							onclick={toggleTheme}>
							<iconify-icon icon={darkMode ? 'ic:round-dark-mode' : 'ic:round-light-mode'}
							></iconify-icon>
						</button>
						<div
							class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
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
					</div>
				</nav>
			{/if}
		</header>
		<img
			src="https://directus.vitormisumi.com/assets/{darkMode
				? data.home.dark_bg_image.id
				: data.home.bg_image.id}?width=600&format=auto"
			alt={$page.params.lang === 'pt' ? 'Linhas de código' : 'Code lines'}
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
			in:fly={{ y: 100, delay: 0, duration: route ? 0 : 1000 }}>
			<div class="relative w-screen py-2 md:py-4">
				<div
					class="from-light via-light dark:from-dark dark:via-dark absolute left-0 top-0 z-50 h-full w-1/12 bg-gradient-to-r via-25% to-transparent transition-colors">
				</div>
				<ul class="inline-block w-max animate-infinite-scroll text-secondary">
					{#each data.technologies as technology}
						<li class="mx-8 inline align-middle md:mx-16 lg:mx-20">
							<iconify-icon
								icon="simple-icons:{technology.name}"
								class="inline-block size-4"
								noobserver></iconify-icon>
						</li>
					{/each}
				</ul>
				<ul class="inline-block w-max animate-infinite-scroll text-secondary" aria-hidden="true">
					{#each data.technologies as technology}
						<li class="mx-8 inline align-middle md:mx-16 lg:mx-20">
							<iconify-icon
								icon="simple-icons:{technology.name}"
								class="inline-block size-4"
								noobserver></iconify-icon>
						</li>
					{/each}
				</ul>
				<div
					class="from-light dark:from-dark dark:via-dark via-light absolute right-0 top-0 z-50 h-full w-1/12 bg-gradient-to-l via-25% to-transparent transition-colors">
				</div>
			</div>
		</footer>
	{/if}
</div>
