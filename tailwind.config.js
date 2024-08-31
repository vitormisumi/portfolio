/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: '#0A100D',
			accent: '#F74C03',
			primary: '#FAFAFF',
            secondary: '#817F82',
            transparent: '#00000000'
		},
		extend: {
			fontFamily: {
				jet: ['JetBrains Mono'],
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
	plugins: []
};
