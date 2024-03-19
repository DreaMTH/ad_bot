const fs = require('fs');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = (client) => {
    client.commandHandler = async () => {
        const commandsFolder = fs.readdirSync('./src/commands');
        for (const folder of commandsFolder) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('js'));
            const { commands, commandList } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandList.push(command.data.toJSON());
                console.log(`${command.data.name}\t has been handled\n`);
            }
        }
        const clientID = "1219398595954999308";
        const guildID = "1193347855826567169";
        const rest = new REST({ version: "9" }).setToken(process.env.token);
        try {
            console.log("application (/) commands preparing...");
            await rest.put(Routes.applicationGuildCommands(clientID, guildID),{
                body: client.commandList,
            });
            console.log("Commands have been prepared!");

        } catch (error) {
            console.log(error);
        }
    };
};
