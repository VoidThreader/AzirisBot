const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(`Provides information about the bot's commands`),
	
	async execute(interaction) {
		const helpMessage = new EmbedBuilder()
			.setTitle('AzirisBot Commands')
			.setAuthor({ name: 'Bot Help', iconURL: interaction.client.user.displayAvatarURL() })
			.setColor(0x4AA8FF)
			.setDescription(`List of commands:\n
				• **/help**: Provides information about the bot's commands.
				• **/flip**: Mystic flour cookie performs mystic flips.
				• **/rng**: Number guessing game, rolls a d20 on default. To quit, type "quit" in chat.
				• **/roll**: Rolls a d20 on default. Change it with the lowest and highest options.
				• **/shadowmilk**: Sends an image of shadow milk cookie.
			`)

		await interaction.reply({ embeds: [helpMessage] });
	},
};