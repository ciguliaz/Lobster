const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ding')
		.setDescription('Secretly Replies with Dong!'),
	async execute(interaction) {
		await interaction.reply({ content: 'Dong!', ephemeral: true });
	},
};
