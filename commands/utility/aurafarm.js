const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aurafarm')
		.setDescription('Silent Salt aurafarming.'),
	async execute(interaction) {
		await interaction.reply({ files: ['./assets/ssc_aurafarm.gif'] });
	},
};