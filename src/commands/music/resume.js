const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('resume current track'),

	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'No tracks right now!',
				ephemeral: true,
			});
		}
		const guildQueue = await nodes.get(interaction.guild.id).node;
		if (guildQueue.isPaused()) {
			await guildQueue.resume();
			return await interaction.reply({
				content: 'song is resumed!',
				ephemeral: true
			});
		}
		await interaction.reply({
			content: 'no paused sons!',
			ephemeral: true,
		});
	}

};
