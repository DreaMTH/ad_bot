const { SlashCommandBuilder, EmbedBuilder,
	ActionRowBuilder, StringSelectMenuBuilder,
	ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Turning music on.')
		.addStringOption((option) =>
			option
				.setName('song')
				.setDescription('choose song to play')
				.setRequired(true)
		),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true,

		});
		console.log(interaction.member.voice.channel);
		if (!interaction.member.voice.channel) {
			interaction.editReply({
				content: `You are not in the voice channe`,
				ephemeral: true,
			});
			return;
		}
		await interaction.editReply({
			content: '.',
			ephemeral: true,
		});
		await interaction.deleteReply();
		const searchResult = await client.player.search(interaction.options.getString('song'));
		if (searchResult.isEmpty() || !searchResult.hasTracks()) {
			return interaction.editReply({
				content: 'No songs',
				ephemeral: true,
			});
		}
		const songList = searchResult.tracks.slice(0, 10);
		console.log(songList);
		const responeList = new EmbedBuilder()
			.setTitle('Songs list')
			.setDescription(`${songList.join('\n')}`)
			.setColor(0x0099FF);
		await interaction.channel.send({ embeds: [responeList] });
		await client.player.play(interaction.member.voice.channel, songList[0].url, interaction);
	}

};
