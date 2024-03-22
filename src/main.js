require('dotenv').config();

const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
});
client.commands = new Collection();
client.commandList = [];

const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
	const functionFiles = fs
		.readdirSync(`./src/functions/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of functionFiles) {
		require(`./functions/${folder}/${file}`)(client);
	}
}

//MTIxOTM5ODU5NTk1NDk5OTMwOA.GeZXXa.si883lbqKJ5C_-236xkng47CiZplbYcr2Zzcsw
client.eventHandler();
client.commandHandler();
client.login(token);
