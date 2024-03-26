const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

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
			fetchReply: true
		});
		console.log(interaction.member.voice.channel);
		if (!interaction.member.voice.channel) {
			interaction.editReply({
				content: `You are not in the voice channe`,
			});
			return;
		}
		const queue = await client.player.nodes.create(interaction.guild);
		await interaction.editReply({
			content: '.',
		});
		await interaction.deleteReply();
		const respone = new EmbedBuilder()
			.setTitle('Songs list')
			.setDescription(`${interaction.options.getString('song')} is required`)
			.setColor(0x0099FF);
		interaction.channel.send({ embeds: [respone] });
	}

};
