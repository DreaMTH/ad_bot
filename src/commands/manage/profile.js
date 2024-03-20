const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userProfile = {
	username: {
		writable: true,
		value: '',
	},
	userPfp: {
		writable: true,
		value: ''
	}
};
module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Get information about your pfofile.')
		.addUserOption(option =>
			option.setName('username')
				  .setDescription('Username of the required profile') ),
	async execute(interaction, client) {
		const currentUser = new Object(userProfile);
		let userLink;
		if(!interaction.options.getUser('username')){
			userLink = interaction.user;
		} else{
			userLink = interaction.options.getUser('username');
		}
		currentUser.username = userLink.tag;
		currentUser.displayName = userLink.displayName;
		currentUser.globalName = userLink.globalName;
		currentUser.userPfp = userLink.avatarURL();
		await interaction.reply(".");
		await interaction.deleteReply();
		const message = new EmbedBuilder()
						.setTitle(`${currentUser.username}'s profile`)
						.setAuthor({name: "a"})
						.setDescription(`@${currentUser.username} @${currentUser.displayName} @${currentUser.globalName}`)
						.setColor(await this.randomColor())
						.setImage(currentUser.userPfp)
						.setThumbnail("https://media1.tenor.com/m/yDv6dGXKzy0AAAAC/homura-akemi-akemi-homura.gif")
						.addFields(
							{ name: 'Regular field title', value: 'Some value here' },
							{ name: '\u200B', value: '\u200B' },
							{ name: 'Inline field title', value: 'Some value here', inline: true },
							{ name: 'Inline field title', value: 'Some value here', inline: true },
						)
						.setTimestamp()
						.setFooter( { text: `@${interaction.user.tag}` });
		await interaction.channel.send({ embeds: [message] });
	},
	async randomColor () { return Math.floor(Math.random()*16777215).toString(16) },
};