import getDirectusInstance from '$lib/directus';
import type { About } from '$lib/types.js';
import { readItems } from '@directus/sdk';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	return {
		about_sections: await directus.request(
			readItems('about', {
				deep: {
					translations: {
						_filter: {
							_and: [
								{
									languages_code: { _eq: params.lang === 'en' ? 'en-US' : 'pt-BR' }
								}
							]
						}
					}
				},
				fields: ['*.*', { translations: ['*'] }]
			})
		)
	} as unknown as { about_sections: About[] };
}
