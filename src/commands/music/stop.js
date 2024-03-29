const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop the playback!'),
	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'bot is not playing!',
				ephemeral: true,
			});
		}
		const guildQueue = await nodes.get(interaction.guild.id);
		const queueNode = guildQueue.node;
		await queueNode.stop(true);
		await interaction.reply({
			content: '***bye-bye***',
		});
	},
};
