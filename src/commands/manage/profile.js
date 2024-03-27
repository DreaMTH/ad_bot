const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userProfile = {
	username: {
		writable: true,
		value: '',
	},
	displayName: {},
	globalName: {},

	userPfp: {
		writable: true,
		value: ''
	},
	userJoiningDate: {},
	userJoinedGuild: {},

};
module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Get information about your pfofile.')
		.addUserOption(option =>
			option.setName('username')
				.setDescription('Username of the required profile')),
	async execute(interaction, client) {
		const currentUser = new Object(userProfile);
		let userLink;
		if (!interaction.options.getUser('username')) {
			userLink = interaction.user;
		} else {
			userLink = interaction.options.getUser('username');
		}
		//test region
		await client.guilds.fetch(interaction.guild.id).then(guild => {
			console.log(guild.id);
			guild.members.fetch(userLink.id).then(user => {
				currentUser.userJoinedGuild = user.joinedAt;
			});
		});
		//region end
		currentUser.username = userLink.tag;
		currentUser.displayName = userLink.displayName;
		currentUser.globalName = userLink.globalName;
		currentUser.userPfp = userLink.avatarURL();
		currentUser.userJoiningDate = userLink.createdAt;
		const color = await this.randomColor();
		await interaction.reply(".");
		await interaction.deleteReply();
		const message = new EmbedBuilder()
			.setTitle(`${currentUser.username}'s profile`)
			.setAuthor({ name: "a" })
			.setDescription(`@${currentUser.username} @${currentUser.displayName} @${currentUser.globalName}`)
			.setColor(color)
			.setImage(currentUser.userPfp)
			.setThumbnail("https://media1.tenor.com/m/yDv6dGXKzy0AAAAC/homura-akemi-akemi-homura.gif")
			.addFields(
				{ name: 'This discription would be taken from the db later', value: '*context*' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Joined to the discord', value: `${currentUser.userJoiningDate}`, inline: true },
				{ name: 'Joined to the server', value: `${currentUser.userJoinedGuild}`, inline: true },
			)
			.setTimestamp()
			.setFooter({ text: `@${interaction.user.tag}` });
		await interaction.channel.send({ embeds: [message] });
	},
	async randomColor() { return Math.floor(Math.random() * 16777215).toString(16) },
};
