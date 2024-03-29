const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('shuffle queue'),
	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'bot is not playing!',
				ephemeral: true,
			});
		}
		const guildQueue = await nodes.get(interaction.guild.id);
		if (guildQueue.isShuffling) {
			await guildQueue.disableShuffle();
			return await interaction.reply({
				content: 'shuffle mode disabled.',
			});
		}
		await guildQueue.enableShuffle(true);
		interaction.reply({
			content: 'shuffle mode enabled',
		});

	},

};
