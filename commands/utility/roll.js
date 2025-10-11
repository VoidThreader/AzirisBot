const { SlashCommandBuilder } = require('discord.js');

// Fuck my life
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription(
			'Rolls a d20 on default. Change it with the lowest and highest options.',
		)
		.addIntegerOption(option =>
			option.setName('lowest')
				.setDescription('Lowest number to roll.')
				.setRequired(false),
		)
		.addIntegerOption(option =>
			option.setName('highest')
				.setDescription('Highest number to roll.')
				.setRequired(false),
		),

	async execute(interaction) {

		const range = {
			lowest : interaction.options.getInteger('lowest') ?? 1,
			highest : interaction.options.getInteger('highest') ?? 20,
		};

		if (range.lowest > range.highest) {
			[range.lowest, range.highest] = [range.highest, range.lowest];
		}

		const generatedNum = Math.floor(Math.random() * (range.highest - range.lowest + 1)) + range.lowest;
		await interaction.reply(`${generatedNum}`);
	},
};