const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription(`Provides information about the bot's commands.`),
	
	async execute(interaction) {
		const helpMessage = new EmbedBuilder()
			.setTitle('AzirisBot Commands')
			.setAuthor({ name: 'Bot Help', iconURL: interaction.client.user.displayAvatarURL() })
			.setColor(0x4AA8FF)
			.setDescription(`List of commands:\n
				• **/help**: Provides information about the bot's commands.
				• **/flip**: Mystic flour cookie performs mystic flips.
				• **/aurafarm**: Silent Salt aurafarming.
				• **/rng**: Number guessing game, rolls a d20 on default. To quit, type "quit" in chat.
				• **/roll**: Rolls a d20 on default. Change it with given options.
				• **/8-ball**: Answers a question.
				• **/shadowmilk**: Sends an image of shadow milk cookie.
			`)

		await interaction.reply({ embeds: [helpMessage] });
	},
};