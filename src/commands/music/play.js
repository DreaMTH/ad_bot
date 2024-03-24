const { SlashCommandBuilder } = require('discord.js');
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
		const newMessage = `song -> ${interaction.options.getString('song')} is requierd`;
		await interaction.editReply({
			content: newMessage
		});
		await wait(4_000);
		await interaction.deleteReply();
	}

};
