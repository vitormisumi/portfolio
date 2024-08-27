/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			background: '#0C1618',
			accent: '#F74C03',
			primary: '#47A8BD',
			secondary: '#FFFCF2'
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
