import { FT, T } from '@skyra/http-framework-i18n';

export const Name = T('commands/info:name');
export const Description = T('commands/info:description');
export const EmbedDescription = T('commands/info:embedDescription');
export const FieldUptimeTitle = T('commands/info:fieldUptimeTitle');
export const FieldUptimeValue = FT<{ host: string; client: string }>('commands/shared:fieldUptimeValue');
export const FieldServerUsageTitle = T('commands/info:fieldServerUsageTitle');
export const FieldServerUsageValue = FT<{ cpu: string; heapUsed: string; heapTotal: string }>('commands/info:fieldServerUsageValue');
export const ButtonInvite = T('commands/info:buttonInvite');
export const ButtonSupport = T('commands/info:buttonSupport');
export const ButtonGitHub = T('commands/info:buttonGitHub');
export const ButtonDonate = T('commands/info:buttonDonate');
