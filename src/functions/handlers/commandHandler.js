const fs = require('fs');

module.exports = (client) => {
    client.commandHandler = async() => {
        const commandsFolder = fs.readdirSync('./src/commands');
        for(const folder of commandsFolder){
            const commandFiles = fs
            .readdirSync(`./src/commands/${folder}`)
            .filter(file => file.endsWith('js'));
            const { commands, commandList} = client;
            for(const file of commandFiles){
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandList.push(command, command.data.toJSON());
                console.dir(`${command}\thas been handled\n`, depth = null);
            }
        }
    };
};