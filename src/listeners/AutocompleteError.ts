import { SentryListener } from '#lib/structure/SentryListener';
import { captureException } from '@sentry/node';
import { Listener, type ClientEventAutocompleteContext, type ClientEvents } from '@skyra/http-framework';

export class UserListener extends SentryListener {
	public constructor(context: Listener.LoaderContext, options: Listener.Options) {
		super(context, { ...options, event: 'autocompleteError' satisfies keyof ClientEvents });
	}

	public run(error: unknown, context: ClientEventAutocompleteContext) {
		captureException(error, (scope) => scope.setLevel('error').setTag('event', this.name).setExtra('command', context.command.name));
	}
}
