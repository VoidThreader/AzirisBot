const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks the bot\'s latency.'),
    
    async execute(interaction) {
        await interaction.reply(`Ping: ${(Date.now() - interaction.createdTimestamp) * -1}ms.`);
    },
};