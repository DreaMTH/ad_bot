module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const banWords = ['.ru', 'vk.com', 'vc.com', 'yandex', '.ру', '.рф',]
        const { content } = message;
        if (banWords.some(bw => content.includes(bw))) {
            await message.reply('KY5');
            await message.delete();
        }

    }

}
