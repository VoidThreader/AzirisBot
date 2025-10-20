const { SlashCommandBuilder } = require('discord.js');

// Fuck my life
module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription(
			'Rolls a d20 on default. Change it with given options.',
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
		)
		.addIntegerOption(option =>
			option.setName('rolls')
				.setDescription('Number of dice rolls. Max of 100.')
				.setRequired(false),
		)
		.addIntegerOption(option =>
			option.setName('modifier')
				.setDescription('Add or subtract to your roll.')
				.setRequired(false),
		),

	async execute(interaction) {
		
		let sumRoll = 0;
		let finalRoll = 1;

		const range = {
			lowest : interaction.options.getInteger('lowest') ?? 1,
			highest : interaction.options.getInteger('highest') ?? 20,
		};

		if (range.lowest > range.highest) {
			[range.lowest, range.highest] = [range.highest, range.lowest];
		}

		const rolls = Math.min(Math.max(interaction.options.getInteger('rolls') ?? 1, 1), 100);
		for (let i = 0; i < rolls; i++) {
			const generatedNum = Math.floor(Math.random() * (range.highest - range.lowest + 1)) + range.lowest;
			sumRoll += generatedNum;
		}

		const modifier = interaction.options.getInteger('modifier') ?? 0;
		
		if ((sumRoll + modifier) > 1) {
			finalRoll = sumRoll + modifier;
		}
		
		await interaction.reply(`${finalRoll}`);
	},
};