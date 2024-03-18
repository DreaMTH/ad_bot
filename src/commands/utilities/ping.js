const { SlashCommandBuilder } = require('discord.js');

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
	}

};
