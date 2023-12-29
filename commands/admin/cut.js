const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cut')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		// Get the target user and the reason for banning
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';

		const videoLink =
            'https://cdn.discordapp.com/attachments/986704322140188732/1175145235324616764/11181.mov?ex=656a2a49&is=6557b549&hm=6c88a1b1a6216583cef64d7c4ba7133c774f2be298c7dd82d20d4cd0b1f16bf3&';
		// Get the target member and check if they are an administrator
		const targetMember = interaction.guild.members.cache.get(target.id);
		const isAdmin = targetMember.permissions.has('ADMINISTRATOR');

		// If the target member is an administrator, inform the user and return
		if (isAdmin) {
			await interaction.reply('You cannot ban an administrator.');
			return;
		}

		// Inform the user that the target member is not an administrator
		await interaction.reply('this isnt an admintrator');

		// Attempt to ban the target member
		try {
			await interaction.guild.members.ban(target, { reason });
			await interaction.reply(`Banned ${target.username} for reason: ${reason}`);
			await target.send(`You have been banned from the server for reason: ${reason}.\n${videoLink}`);
		}
		catch (error) {
			console.error(`Failed to ban ${target.username}:`, error);
			await interaction.reply('An error occurred while trying to ban the user.');
		}

	},
};
//
// In this code, we have a Slash Command called 'cut' that takes a user option and a string option. The user option is the target member to ban, and the string option is the reason for banning.
//
// The command first checks if the target member is an administrator. If they are, the command informs the user that they cannot ban an administrator and returns.
//
// If the target member is not an administrator, the command informs the user that the target member is not an administrator.
//
// Next, the command attempts to ban the target member. If the ban is successful, the command informs the user that the target member has been banned and sends a message to the target user with the reason for banning and a video link.
//
// If an error occurs while trying to ban the target member, the command logs the error and informs the user that an error occurred while trying to ban the user..</s>