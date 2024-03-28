const { SlashCommandBuilder, ContextMenuCommandInteraction } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip current song'),
	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'Queue is empty!',
				ephemeral: true,
			});
		}
		const gQueue = nodes.get(interaction.guild.id);
		if (gQueue.isEmpty()) {
			/*await interaction.reply({
				content: 'Queue is empty!',
				ephemeral: true,
			});*/
			return await gQueue.node.stop(true);
		}
		await gQueue.node.skip();
		await interaction.reply({
			content: 'Successfully skipped!',
			ephemeral: true,
		});
	},
};
