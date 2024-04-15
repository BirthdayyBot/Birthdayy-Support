import { EmbedBuilder, time, TimestampStyles } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { applyLocalizedBuilder, getSupportedUserLanguageT, type TFunction } from '@skyra/http-framework-i18n';
import {
	ButtonStyle,
	ComponentType,
	MessageFlags,
	type APIActionRowComponent,
	type APIEmbedField,
	type APIMessageActionRowComponent
} from 'discord-api-types/v10';
import { cpus, uptime, type CpuInfo } from 'node:os';
import { LanguageKeys } from '../lib/i18n/LanguageKeys.js';
import { getInvite, getRepository } from '../lib/information.js';

const Root = LanguageKeys.Commands.Info;

@RegisterCommand((builder) => applyLocalizedBuilder(builder, Root.Name, Root.Description))
export class SharedCommand extends Command {
	public override chatInputRun(interaction: Command.ChatInputInteraction) {
		const t = getSupportedUserLanguageT(interaction);
		const embed = new EmbedBuilder()
			.setDescription(t(Root.EmbedDescription))
			.addFields(this.getUptimeStatistics(t), this.getServerUsageStatistics(t));
		const components = this.getComponents(t);

		return interaction.reply({ embeds: [embed.toJSON()], components, flags: MessageFlags.Ephemeral });
	}

	private getUptimeStatistics(t: TFunction): APIEmbedField {
		const now = Date.now();
		const nowSeconds = Math.round(now / 1000);

		return {
			name: t(Root.FieldUptimeTitle),
			value: t(Root.FieldUptimeValue, {
				host: time(Math.round(nowSeconds - uptime()), TimestampStyles.RelativeTime),
				client: time(Math.round(nowSeconds - process.uptime()), TimestampStyles.RelativeTime)
			})
		};
	}

	private getServerUsageStatistics(t: TFunction): APIEmbedField {
		const usage = process.memoryUsage();

		return {
			name: t(Root.FieldServerUsageTitle),
			value: t(Root.FieldServerUsageValue, {
				cpu: cpus().map(SharedCommand.formatCpuInfo.bind(null)).join(' | '),
				heapUsed: (usage.heapUsed / 1048576).toLocaleString(t.lng, { maximumFractionDigits: 2 }),
				heapTotal: (usage.heapTotal / 1048576).toLocaleString(t.lng, { maximumFractionDigits: 2 })
			})
		};
	}

	private getComponents(t: TFunction) {
		const url = getInvite();
		const support = this.getSupportComponent(t);
		const github = this.getGitHubComponent(t);
		const donate = this.getDonateComponent(t);
		const data = url
			? [this.getActionRow(support, this.getInviteComponent(t, url)), this.getActionRow(github, donate)]
			: [this.getActionRow(support, github, donate)];

		return data;
	}

	private getActionRow(...components: APIMessageActionRowComponent[]): APIActionRowComponent<APIMessageActionRowComponent> {
		return { type: ComponentType.ActionRow, components };
	}

	private getSupportComponent(t: TFunction): APIMessageActionRowComponent {
		return {
			type: ComponentType.Button,
			style: ButtonStyle.Link,
			label: t(Root.ButtonSupport),
			emoji: { name: '🆘' },
			url: 'https://discord.gg/Bs9bSVe2Hf'
		};
	}

	private getInviteComponent(t: TFunction, url: string): APIMessageActionRowComponent {
		return {
			type: ComponentType.Button,
			style: ButtonStyle.Link,
			label: t(Root.ButtonInvite),
			emoji: { name: '🎉' },
			url
		};
	}

	private getGitHubComponent(t: TFunction): APIMessageActionRowComponent {
		return {
			type: ComponentType.Button,
			style: ButtonStyle.Link,
			label: t(Root.ButtonGitHub),
			emoji: { id: '1229375525827645590', name: 'github2' },
			url: getRepository()
		};
	}

	private getDonateComponent(t: TFunction): APIMessageActionRowComponent {
		return {
			type: ComponentType.Button,
			style: ButtonStyle.Link,
			label: t(Root.ButtonDonate),
			emoji: { name: '🧡' },
			url: 'https://donate.birthdayy.xyz'
		};
	}

	private static formatCpuInfo({ times }: CpuInfo) {
		return `${Math.round(((times.user + times.nice + times.sys + times.irq) / times.idle) * 10000) / 100}%`;
	}
}
