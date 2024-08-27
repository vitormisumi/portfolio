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
		return $page.url.pathname.split('/')[1];
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
		class=" bg-gradient-to-b from-[#05090A] to-transparent p-4 landscape:p-8"
		in:slide={{ delay: 6000, duration: 1000 }}>
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
					Vitor Misumi
				</a>
				<nav
					class="flex w-1/2 flex-col justify-around font-jet text-sm text-secondary landscape:flex-row landscape:text-base">
					<a
						href="/{lang}/about"
						class="transition-colors hover:text-accent {route === 'about'
							? 'underline underline-offset-4'
							: ''}">Sobre mim</a>
					<a
						href="/{lang}/projects"
						class="transition-colors hover:text-accent {route === 'projects'
							? 'underline underline-offset-4'
							: ''}">Projetos</a>
					<a
						href="/{lang}/contact"
						class="transition-colors hover:text-accent {route === 'contact'
							? 'underline underline-offset-4'
							: ''}">Contato</a>
				</nav>
				<div class="grid grid-cols-2 place-items-center divide-x divide-secondary text-secondary">
					<a href="/pt/{route}" class="pr-2 hover:text-accent">PT</a>
					<a href="/en/{route}" class="pl-2 hover:text-accent">EN</a>
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
		in:slide={{ delay: 6000, duration: 1000 }}>
		<a href="https://github.com/vitormisumi" class="flex items-center border-r px-3 md:px-8 py-2 md:py-4">
			<iconify-icon icon="mdi:github"></iconify-icon>
		</a>
		<a href="https://www.linkedin.com/in/vitormisumi/" class="flex items-center border-r px-3 md:px-8 py-2 md:py-4">
			<iconify-icon icon="mdi:linkedin"></iconify-icon>
		</a>
		<ul class="flex w-full items-center justify-around text-xl text-secondary">
			<li>
				<i class="devicon-html5-plain"></i>
			</li>
			<li>
				<i class="devicon-javascript-plain"></i>
			</li>
			<li>
				<i class="devicon-svelte-plain"></i>
			</li>
			<li>
				<i class="devicon-tailwindcss-original"></i>
			</li>
			<li>
				<i class="devicon-typescript-plain"></i>
			</li>
			<li>
				<i class="devicon-postgresql-plain"></i>
			</li>
			<li>
				<i class="devicon-supabase-plain"></i>
			</li>
			<li>
				<i class="devicon-vercel-original"></i>
			</li>
			<li>
				<i class="devicon-sanity-plain"></i>
			</li>
			<li>
				<i class="devicon-python-plain"></i>
			</li>
			<li>
				<i class="devicon-figma-plain"></i>
			</li>
		</ul>
	</footer>
{/if}
