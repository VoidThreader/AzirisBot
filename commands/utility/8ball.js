const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8-ball')
        .setDescription('Answers a question.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Ask a question!')
                .setRequired(true)),
    
    async execute(interaction) {
        const responses = [
            "Correct!",
            "It is decidedly so.",
            "No doubt about it.",
            "What do you think?",
            "Lmao.",
            "Nope!",
            "Nopity nope nope!",
            "No.",
        ];

        const question = interaction.options.getString('question');
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        await interaction.reply(`**Q:** ${question}\n**A:** ${randomResponse}`);
    },
};