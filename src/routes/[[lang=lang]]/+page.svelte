<script lang="ts">
	import { navigating } from '$app/stores';
	import code from '$lib/assets/code.png';
	import profile from '$lib/assets/profile.png';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let pageLoaded = $state(false);
	let duration = $state(0);
	let codeImageDelay = $state(0);
	let profileImageDelay = $state(0);
	let textDelay = $state(0);
	let projectsDelay = $state(0);

	onMount(() => {
		if ($navigating) {
			duration = 0;
			codeImageDelay = 0;
			profileImageDelay = 0;
			textDelay = 0;
			projectsDelay = 0;
		} else {
			duration = 1500;
			codeImageDelay = 6000;
			profileImageDelay = 1500;
			textDelay = 3000;
			projectsDelay = 4500;
		}
		pageLoaded = true;
	});
</script>

{#if pageLoaded}
	<div
		class="fixed top-0 -z-10 flex h-screen w-full flex-col items-center justify-evenly landscape:flex-row">
		<div class="flex h-44 max-w-lg flex-col justify-end md:h-72">
			<div class="relative flex h-full flex-col items-center justify-end">
				<div class="relative w-full" in:fly={{ y: 500, duration: duration }}>
					<p class="pl-5 md:pl-0 w-full text-xs text-accent md:text-base">
						Prazer! Sou
					</p>
					<svg width="100%" class="absolute -z-10 h-8 text-4xl md:h-12 md:text-6xl">
						<text
							x="50%"
							y="50%"
							text-anchor="middle"
							dominant-baseline="central"
							font-family="Roboto Mono"
							font-weight="bold"
							fill="#F74C03"
							stroke="#F74C03"
							stroke-width="1">
							VITOR MISUMI
						</text>
					</svg>
					<svg width="100%" class="h-8 text-4xl md:h-12 md:text-6xl">
						<text
							x="50%"
							y="50%"
							text-anchor="middle"
							dominant-baseline="central"
							font-family="Roboto Mono"
							font-weight="bold"
							fill="none"
							stroke="#F74C03"
							stroke-width="1">
							VITOR MISUMI
						</text>
					</svg>
				</div>
				<img
					src={profile}
					alt="Vitor Misumi"
					class="absolute -z-10 h-full shadow-secondary drop-shadow-[0_0_4px_rgba(255,252,242,0.2)]"
					in:fly={{ x: 500, duration: duration, delay: profileImageDelay }} />
			</div>
			<p
				class="text-center text-xs font-extralight tracking-tight text-primary md:text-lg md:tracking-wide"
				in:fade={{ duration: duration, delay: textDelay }}>
				Desenvolvedor web baseado em Porto, PT
			</p>
		</div>
		<div
			class="h-48 w-full max-w-xs md:max-w-lg rounded-lg border border-[#333333] bg-[#0B0F10] md:h-72"
			in:fade={{ delay: projectsDelay }}>
		</div>
		<img
			src={code}
			alt="Linhas de código"
			class="absolute left-0 top-12 -z-20 opacity-10 md:left-12 md:h-4/5"
			in:fade={{ delay: codeImageDelay }} />
	</div>
{/if}
