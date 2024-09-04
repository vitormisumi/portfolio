import getDirectusInstance from '$lib/directus';
import type { Home, Profile, Technology } from '$lib/types.js';
import { readItems } from '@directus/sdk';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	return {
		home: await directus.request(
			readItems('home', {
				deep: {
					translations: {
						_filter: {
							languages_code: { _eq: params.lang === 'en' ? 'en-US' : 'pt-BR' }
						}
					}
				},
				fields: ['*.*.*', { translations: ['*'] }]
			})
		),
		technologies: await directus.request(readItems('technologies')),
		profiles: await directus.request(readItems('profiles'))
	} as unknown as { home: Home; technologies: Technology[]; profiles: Profile[] };
}
