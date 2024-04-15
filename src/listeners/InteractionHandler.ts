import { SentryListener } from '#lib/structure/SentryListener';
import { captureException } from '@sentry/node';
import { Listener, type ClientEventInteractionHandlerContext, type ClientEvents } from '@skyra/http-framework';

export class UserListener extends SentryListener {
	public constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, { ...options, event: 'interactionHandlerError' satisfies keyof ClientEvents });
	}

	public run(error: unknown, context: ClientEventInteractionHandlerContext) {
		captureException(error, (scope) => scope.setLevel('error').setTag('event', this.name).setExtra('handler', context.handler.name));
	}
}
