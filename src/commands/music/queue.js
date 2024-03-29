const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('list of the sogns in queue...'),

	async execute(interaction, client) {
		const { nodes } = client.player;
		if (!nodes.has(interaction.guild.id)) {
			return await interaction.reply({
				content: 'There are no songs...',
				ephemeral: true,
			});
		}
		const gQueue = await nodes.get(interaction.guild.id);
		const response = new EmbedBuilder()
			.setTitle('List of songs...')
			.setDescription('***songs in queue:***')
			.addFields({ name: `${gQueue.currentTrack}`, value: `${gQueue.currentTrack.duration}` });
		const guildTracks = gQueue.tracks.toArray();
		for (const track of guildTracks) {
			response.addFields({ name: `${track}`, value: `${track.duration}` });
		}
		await interaction.channel.send({ embeds: [response] });
	},



};
