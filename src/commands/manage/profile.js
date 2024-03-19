const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Get information about your pfofile.'),
	async execute(interaction, client) {
		await interaction.reply(".");
		await interaction.deleteReply();
		const message = new EmbedBuilder()
						.setTitle(`${interaction.user.tag}'s profile`)
						.setDescription(`@${interaction.user.tag} @${interaction.user.displayName} @${interaction.user.globalName}`)
						.setColor(0x0099FF)
						.setFooter( { text: `@${interaction.user.tag}` });
		await interaction.channel.send({ embeds: [message] });
	}
};