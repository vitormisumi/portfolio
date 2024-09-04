import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let lang: string;

	if (event.url.pathname.startsWith('/en')) {
		lang = 'en';
	} else {
		lang = 'pt';
	}

	return await resolve(event, {
		filterSerializedResponseHeaders: (key, value) => {
			return key.toLowerCase() === 'content-type';
		},
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
