const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause current track'),

	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'Song is not playing!!!',
				ephemeral: true,
			});
		}
		await nodes.get(interaction.guild.id).node.pause();
		await interaction.reply({
			content: 'Song has been paused!',
			ephemeral: true,
		});
	},

};
