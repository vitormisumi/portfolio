/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: '#0A100D',
			accent: '#F74C03',
			primary: '#FAFAFF',
			secondary: '#817F82'
		},
		extend: {
			fontFamily: {
				jet: ['JetBrains Mono'],
				roboto: ['Roboto Mono']
			}
		}
	},
	plugins: []
};
