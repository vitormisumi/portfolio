import { PUBLIC_DIRECTUS_API_URL } from '$env/static/public';
import { createDirectus, rest } from '@directus/sdk';

function getDirectusInstance(fetch: any) {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(PUBLIC_DIRECTUS_API_URL, options).with(rest());
	return directus;
}

export default getDirectusInstance;
