const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const path = require('path');
const { getRandInt } = require('../../utils/rand.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aurafarm')
		.setDescription('Silent Salt aurafarming.'),

	async execute(interaction) {
		await interaction.deferReply();

		const files = [
			path.resolve('assets/ssc_aurafarm.gif'),
			path.resolve('assets/ssc_aurafarm1.gif'),
			path.resolve('assets/ssc_aurafarm2.gif'),
		]
		try {
			const file = files[getRandInt(0, files.length - 1)];
			await interaction.editReply({
				files: [file]
			})
		} catch (err) {
			console.error('Aurafarmed too hard!\n', err);
			await interaction.editReply('Aurafarmed too hard!').catch(()=>{});
		}
	},
};