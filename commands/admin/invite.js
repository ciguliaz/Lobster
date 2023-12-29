const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Generate an invite link for a specified channel')
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The channel to generate the invite link for')),
	async execute(interaction) {
		try {
			let targetChannel = interaction.options.getChannel('channel');

			// If no channel is specified, default to the current channel
			if (!targetChannel) {
				targetChannel = interaction.channel;
			}

			// const invite = await targetChannel.createInvite({ temporary: false, maxAge: 0, maxUses: 0 });
			for (let i = 0; i < 1; i++) {
				const invite = await targetChannel.createInvite({ temporary: false, maxAge: 0, maxUses: 0 });
				if (!i) {
					await interaction.reply(`Here's the invite link for ${targetChannel.name}: ${invite.url}`);
				}
				else {
					await interaction.followUp(`Here's the invite link for ${targetChannel.name}: ${invite.url}`);
				}
			}

			// await interaction.reply(`Here's the invite link for ${targetChannel.name}: ${invite.url}`);

		}
		catch (error) {
			console.error('Failed to create invite:', error);
			await interaction.reply('Failed to create invite.');
		}
	},
};