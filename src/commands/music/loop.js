const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loop entire queue'),
	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			await interaction.reply({
				content: 'Bot is not playing...',
				ephemeral: true,
			});
		}
		const guildQueue = await nodes.get(interaction.guild.id);
		if (guildQueue.repeatMode === 2) {
			await guildQueue.setRepeatMode(0);
			return await interaction.reply({
				content: 'loop mode disabled',
			});
		}
		await guildQueue.setRepeatMode(2);
		await interaction.reply({
			content: 'loop mode enabled!'
		});
	},

};
