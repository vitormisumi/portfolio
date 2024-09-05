<script lang="ts">
	import { browser } from '$app/environment';

	let darkMode = $state(false);

	function toggleTheme() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
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

<button
	class="hover:text-light hover:dark:text-dark flex aspect-square items-center justify-center rounded p-2 hover:bg-secondary size-8"
	aria-label={darkMode ? 'dark mode' : 'light mode'}
	onclick={toggleTheme}>
	<iconify-icon icon={darkMode ? 'ic:round-dark-mode' : 'ic:round-light-mode'}></iconify-icon>
</button>
