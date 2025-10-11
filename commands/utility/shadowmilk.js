const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shadowmilk')
		.setDescription('Sends an image of shadow milk cookie.'),
	async execute(interaction) {
		await interaction.reply({ files: ['./assets/shadow_milk_plush.png'] });
	},
};