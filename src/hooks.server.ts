import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let lang: string;

	if (event.url.pathname === '/') {
		const acceptLanguage = event.request.headers.get('accept-language');
		if (acceptLanguage && acceptLanguage.startsWith('pt')) {
			return new Response(null, {
				status: 302,
				headers: { Location: '/pt' }
			});
		} else {
			return new Response(null, {
				status: 302,
				headers: { Location: '/en' }
			});
		}
	}

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
