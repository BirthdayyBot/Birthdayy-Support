import { isSentryInitialized } from '#lib/sentry';
import { Listener } from '@skyra/http-framework';

export abstract class SentryListener extends Listener {
	public constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, { enabled: isSentryInitialized(), ...options });
	}
}
