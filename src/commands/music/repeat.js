const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('repeat current track'),
	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'bot is not playing!',
				ephemeral: true,
			});
		}
		const guildQueue = nodes.get(interaction.guild.id);
		if (guildQueue.repeatMode === 1) {
			await guildQueue.setRepeatMode(0);
			return await interaction.reply({
				content: 'repeat mode disabled.',
			});
		}
		await guildQueue.setRepeatMode(1);
		await interaction.reply({
			content: 'repeat mode enabled',
		});
	}
};
