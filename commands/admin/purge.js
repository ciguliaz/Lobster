const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Bulk delete a number of message')
		.addIntegerOption(option =>
			option
				.setName('quantity')
				.setDescription('Quantity of messages to be purged.')
				.setRequired(true)
				.setMaxValue(50)),
	async execute(interaction) {
		const quantity = interaction.options.getInteger('quantity');

		// Check if the bot has the necessary permission to delete messages
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			return interaction.reply('You do not have permission to use this command.');
		}

		// Fetch the channel where the command was executed
		const channel = interaction.channel;

		// Fetch the messages to be deleted
		const messages = await channel.messages.fetch({ limit: quantity });

		// Delete the messages
		// channel.bulkDelete(messages)
		// 	.then(() => {
		// 		interaction.reply(`Successfully deleted ${quantity} messages.`);
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error while deleting messages:', error);
		// 		interaction.reply('An error occurred while deleting messages.');
		// 	});

		channel.bulkDelete(messages)
			.then(() => {
				interaction.reply(`Successfully purged ${quantity} messages.`)
					.then((reply) => {
						// Delete the success announcement message after a delay of 5 seconds (5000 milliseconds)
						setTimeout(() => {
							reply.delete().catch(console.error);
						}, 5000);
					})
					.catch(console.error);
			})
			.catch((error) => {
				console.error('Error while deleting messages:', error);
				interaction.reply('An error occurred while deleting messages.');
			});

	},
};