require('dotenv').config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits, VideoQualityMode } = require('discord.js');
const { Player } = require('discord-player');
const fs = require('fs');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});
client.commands = new Collection();
client.commandList = [];
client.player = new Player(client, {
	ytdlOptions: {
		VideoQualityMode: 'highestaudio',

	}
});
const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

client.eventHandler();
client.commandHandler();
client.login(token);
