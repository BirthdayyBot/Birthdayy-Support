import { initializeSentry } from '#lib/sentry';
import { setup as envSetup } from '@skyra/env-utilities';

envSetup(new URL('../../../src/.env', import.meta.url));
initializeSentry();

import '#lib/setup/fastify';
import '#lib/setup/logger';
import '#lib/setup/prisma';

export async function setup() {
	// Load all routes
	await import('#api/routes/_load');
}
