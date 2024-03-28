const { SlashCommandBuilder, EmbedBuilder,
	ActionRowBuilder, StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

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
		if (!interaction.member.voice.channel) {
			interaction.reply({
				content: `You are not in the voice channe`,
				ephemeral: true,
			});
			return;
		}
		const searchResult = await client.player.search(interaction.options.getString('song'));
		if (searchResult.isEmpty() || !searchResult.hasTracks()) {
			return interaction.reply({
				content: 'No songs',
				ephemeral: true,
			});
		}
		const songList = searchResult.tracks.slice(0, 10);
		const responeList = new EmbedBuilder()
			.setTitle('***Songs list***')
			.setDescription(`*That songs were finded by your query...*`)
			.setColor(0x0099FF);
		const selectSong = new StringSelectMenuBuilder()
			.setCustomId('selectSong')
			.setPlaceholder('Choose your song!');
		let counter = 1;
		for (const song of songList) {
			selectSong.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel(`${counter}`)
					.setDescription(`${song}`)
					.setValue(`${song.url}`)
			);
			responeList.addFields({
				name: `${counter}. ${song}`,
				value: `${song.url}`,
			});
			counter++;
		}
		const row = new ActionRowBuilder()
			.addComponents(selectSong);
		await interaction.reply({ embeds: [responeList], components: [row] }).then(async Message => {
			const filter = i => i.user.id === interaction.user.id;
			const collector = await Message.createMessageComponentCollector({ filter, time: 60_000 });
			collector.on('collect', async (option) => {
				console.log(option.values[0]);
				await client.player.play(interaction.member.voice.channel, option.values[0], interaction);
				return collector.stop();
			});
			collector.on('end', (msg, reason) => {
				if (reason === 'time') {
					return interaction.editReply({
						content: 'Time is out',
						ephemeral: true,
					});
				}
			});
		});
	}

};
