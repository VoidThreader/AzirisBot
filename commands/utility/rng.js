const { SlashCommandBuilder } = require('discord.js');
const { getRandInt } = require('../../utils/rand.js');

const activeGames = new Set();

// Fuck my life
module.exports = {
	data: new SlashCommandBuilder()
		.setName('rng')
		.setDescription(
			'Number guessing game, rolls a d20 on default. To quit, type "quit" in chat.',
		)
		.addIntegerOption(option =>
			option.setName('lowest')
				.setDescription('Lowest number to guess.')
				.setRequired(false),
		)
		.addIntegerOption(option =>
			option.setName('highest')
				.setDescription('Highest number to guess.')
				.setRequired(false),
		),

	async execute(interaction) {
		const channelId = interaction.channel.id;

		if (activeGames.has(channelId)) {
			await interaction.reply('Ah! Ah! Ah! A game is already in progress!');
			return;
		}

		activeGames.add(channelId);

		const range = {
			lowest : interaction.options.getInteger('lowest') ?? 1,
			highest : interaction.options.getInteger('highest') ?? 20,
		};

		if (range.lowest > range.highest) {
			[range.lowest, range.highest] = [range.highest, range.lowest];
		}

		const generatedNum = getRandInt(range.lowest, range.highest);
		await interaction.reply(`"I rolled a die! Guess which number I got from ${range.lowest} to ${range.highest}!"`);

		const collector = interaction.channel.createMessageCollector({
			filter: m => m.author.id === interaction.user.id,
		});

		collector.on('collect', (msg) => {
			if (msg.content.toLowerCase() === 'quit') {
				msg.reply('Game\'s over!');
				collector.stop();
				return;
			}

			if (!/\d+/.test(msg.content)) {
				return;
			}

			const guessedNum = parseInt(msg.content, 10);

			if (guessedNum < range.lowest || guessedNum > range.highest) {
				msg.reply(`WHOAAA Pal! You're going out of range! Pick between ${range.lowest} and ${range.highest}.`);
				return;
			}
			else if (guessedNum < generatedNum) {
				msg.reply('WRONG! HIGHER!');
			}
			else if (guessedNum > generatedNum) {
				msg.reply('WRONG! LOWER!');
			}
			else if (guessedNum === generatedNum) {
				msg.reply('CORRECT! DING DING DING! We have a winner here!');
				collector.stop();
			}
		});

		collector.on('end', () => {
			activeGames.delete(channelId);
		});
	},
};