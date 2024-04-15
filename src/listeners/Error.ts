import { SentryListener } from '#lib/structure/SentryListener';
import { captureException } from '@sentry/node';
import { Listener, type ClientEvents } from '@skyra/http-framework';

export class SharedListener extends SentryListener {
	public constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, { ...options, event: 'error' satisfies keyof ClientEvents });
	}

	public run(error: unknown) {
		captureException(error, (scope) => scope.setLevel('error').setTag('event', this.name));
	}
}
