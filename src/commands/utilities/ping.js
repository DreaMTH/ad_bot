const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check my ping.'),
	async execute(interaction, client) {
		const message = await interaction.deferReply({
			fetchReply: true
		});
		const newMessage = `Latency equals ${client.ws.ping}\nClient ping equals ${message.createdTimestamp - interaction.createdTimestamp}`;
		await interaction.editReply({
			content: newMessage
		});
		await wait(4_000);
		await interaction.deleteReply();
	}

};
