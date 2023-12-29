const { SlashCommandBuilder, PermissionFlagsBits, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cut2')
		.setDescription('Select a member and ban them.')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The reason for banning'),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
		const videoLink =
            'https://cdn.discordapp.com/attachments/986704322140188732/1175145235324616764/11181.mov?ex=656a2a49&is=6557b549&hm=6c88a1b1a6216583cef64d7c4ba7133c774f2be298c7dd82d20d4cd0b1f16bf3&';
		const targetMember = interaction.guild.members.cache.get(target.id);

		if (targetMember.permissions.has('ADMINISTRATOR', true)) {
			await interaction.reply('You cannot ban an administrator.');
			return;
		}

		if (!interaction.guild.members.cache.has(target.id)) {
			await interaction.reply('The target user is not a member of this server.');
			return;
		}

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId('confirm_ban')
				.setLabel('Confirm Ban')
				.setStyle('DANGER'),
			new MessageButton()
				.setCustomId('cancel_ban')
				.setLabel('Cancel')
				.setStyle('SECONDARY'),
		);

		await interaction.reply({
			content: `Are you sure you want to ban ${target.username}?`,
			components: [row],
		});

		const collector = interaction.channel.createMessageComponentCollector({
			time: 15000,
			filter: (btnInteraction) => btnInteraction.user.id === interaction.user.id,
		});

		collector.on('collect', async (btnInteraction) => {
			if (btnInteraction.customId === 'confirm_ban') {
				try {
					await btnInteraction.deferUpdate();
					await interaction.guild.members.ban(target, { reason });
					await btnInteraction.followUp(`Banned ${target.username} for reason: ${reason}`);
					await target.send(`You have been banned from the server for reason: ${reason}.\n${videoLink}`);
				}
				catch (error) {
					console.error(`Failed to ban ${target.username}:`, error);
					await btnInteraction.followUp('An error occurred while trying to ban the user.');
				}
			}
			else if (btnInteraction.customId === 'cancel_ban') {
				await btnInteraction.deferUpdate();
				await interaction.reply('Ban cancelled.');
			}
		});

		collector.on('end', async () => {
			await interaction.editReply({ components: [] });
		});
	},
};