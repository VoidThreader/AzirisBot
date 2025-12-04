const { SlashCommandBuilder } = require('discord.js');
const { getRandInt } = require('../../utils/rand.js');

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
			'Correct!',
			'It is decidedly so.',
			'No doubt about it.',
			'What do you think?',
			'Lmao.',
			'Nope!',
			'Nopity nope nope!',
			'No.',
		];

		const question = interaction.options.getString('question');
		const randomResponse = responses[getRandInt(0, responses.length - 1)];
		await interaction.reply(`**Q:**  ${question}\n**A:**  ${randomResponse}`);
	},
};