import { setup as envSetup } from '@skyra/env-utilities';
import { initializeSentry, setRepository } from '@skyra/shared-http-pieces';

import '@skyra/shared-http-pieces/register';

envSetup(new URL('../../../src/.env', import.meta.url));
setRepository('https://github.com/BirthdayyBot/Birthdayy-Support');
initializeSentry();

import '#lib/setup/fastify';
import '#lib/setup/logger';
import '#lib/setup/prisma';

export async function setup() {
	// Load all routes
	await import('#api/routes/_load');
}
