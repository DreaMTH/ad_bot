const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('reply on my message.')
        .addStringOption(option => 
            option.setName('text')
            .setDescription("String to reply")
        ),
	async execute(interaction) {
		const newMessage = `${interaction.options.getString('text') ?? 'you sent empty message'}`;
		await interaction.reply({
			content: newMessage
		});
        await wait(4_000);
        await interaction.deleteReply();
	},
};
