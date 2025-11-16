const { SlashCommandBuilder } = require('discord.js');
const { getRandInt } = require('../../utils/rand.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shadowmilk')
		.setDescription('Sends an image of shadow milk cookie.'),
	async execute(interaction) {
		files = [
			'./assets/shadow_milk_plush.png',
			'./assets/shadow_milk_sing.png',
			'./assets/shadow_milk_laugh.png',
		];
		await interaction.reply({ files: [files[getRandInt(0, files.length - 1)]] });
	},
};