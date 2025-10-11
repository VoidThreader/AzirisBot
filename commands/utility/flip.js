const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flip')
		.setDescription('Mystic flour cookie performs mystic flips.'),
	async execute(interaction) {
		await interaction.reply({ files: ['./assets/mfc_flip.gif'] });
	},
};