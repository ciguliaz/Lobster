const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('moreinvite')
		.setDescription('MORE INVITE !!! CAUTION !!! IT MAY FLOOD YOUR WALL WITH INVITE LINK !!! USE CAREFUL !!!')
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The channel to generate the invite link for')
				.setRequired(true))
		.addIntegerOption(option =>
			option
				.setName('quantity')
				.setDescription('The number of invite links to generate, must be less or equal than 50')
				.setRequired(false)
				.setMaxValue(50),
		),
	async execute(interaction) {
		try {
			let targetChannel = interaction.options.getChannel('channel');
			let quantity = interaction.options.getInteger('quantity');

			// If no channel is specified, default to the current channel
			if (!targetChannel) {
				targetChannel = interaction.channel;
			}

			if (!quantity) {
				quantity = 1;
			}
			// const invite = await targetChannel.createInvite({ temporary: false, maxAge: 0, maxUses: 0 });
			for (let i = 0; i < quantity; i++) {
				const invite = await targetChannel.createInvite({ temporary: false, maxAge: 0, maxUses: 0 });
				if (!i) {
					await interaction.reply({ content : `Here's the invite link for ${targetChannel.name}: ${invite.url}`, ephemeral: true });
				}
				else {
					await interaction.followUp({ content : `Here's the invite link for ${targetChannel.name}: ${invite.url}`, ephemeral: true });
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