import getDirectusInstance from '$lib/directus';
import type { Project } from '$lib/types.js';
import { readItems } from '@directus/sdk';

export async function load({ fetch, params }) {
	const directus = getDirectusInstance(fetch);
	return {
		projects: await directus.request(
            readItems('projects', {
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
                sort: ['-start_date'],
				fields: ['*.*', { translations: ['*'] }]
			})
		)
	} as unknown as { projects: Project[] };
}
