/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			dark: '#0A100D',
			accent: '#F74C03',
			light: '#FAFAFF',
			secondary: '#9F9D9D',
			transparent: '#00000000'
		},
		extend: {
			fontFamily: {
				mono: ['JetBrains Mono'],
				roboto: ['Roboto Mono']
			},
			animation: {
				'infinite-scroll': 'infinite-scroll 45s linear infinite'
			},
			keyframes: {
				'infinite-scroll': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-100%)' }
				}
			}
		}
    },
    darkMode: 'class',
	plugins: []
};
