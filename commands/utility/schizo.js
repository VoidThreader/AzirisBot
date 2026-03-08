const { SlashCommandBuilder } = require('discord.js');
const { getRandInt } = require('../../utils/rand.js');
const { OllamaAPI, OllamaModel, SysPrompt } = require('../../config-dev.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schizo')
		.setDescription("Shadow Milk's schizo ramblings."),

	async execute(interaction) {
		await interaction.deferReply();

		const masterPrompt = SysPrompt;

		try {
			const prompts = [
				'Say a random joke.',
				'Tell me something funny.',
				'Share a random about you.',
				'Make a random observation.',
				'Say something silly.',
				'Tell me a joke.',
				'Silly-Vanilly.',
				'Send a random message.',
				'Schizo'
			];
			const randomPrompt = prompts[getRandInt(0, prompts.length - 1)];

			const response = await fetch(`http://${OllamaAPI}/api/generate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: OllamaModel,
					prompt : `${masterPrompt}\n\n${randomPrompt}`,
					stream: false,
					temperature: 0.8,
					top_p: 0.9,
				}),
			});

			if (!response.ok) {
				throw new Error(`Ollama API error: ${response.status}`);
			}

			const data = await response.json();
			const message = data.response.trim();

			// Discord has a 2000 character limit per message
			if (message.length > 2000) {
				await interaction.editReply(`${message.substring(0, 1997)}...`);
			} else {
				await interaction.editReply(message);
			}
		} catch (error) {
			console.error('Ollama error:', error);
			await interaction.editReply('Failed to get a response from Ollama.');
		}
	}
}