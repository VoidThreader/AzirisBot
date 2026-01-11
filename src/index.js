const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { getRandInt } = require('../utils/rand.js');

const { token } = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

const foldersPath = path.join(__dirname, '..', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log(`All eyes on ${client.user.username}!`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}

});

client.on(Events.MessageCreate, async message => {
	if (message.author.bot) return;

	const logEntry = `[${new Date().toLocaleString()}] Message from ${message.author.tag} in #${message.channel.name} (${message.channel.id}):\n${message.content}`;
	console.log(logEntry);

	if (message.content.includes(':3')) {
		await message.channel.send({
			files: ['./assets/white_lily.png'],
		});
	}

	if (message.content.toLowerCase().includes('taking too long')) {
		await message.channel.send({
			files: ['./assets/your_taking_too_long.png'],
		});
	}

	if (message.content.toLowerCase().includes('slashkig') || message.content.toLowerCase().includes('penguin')) {
		await message.channel.send({
			content: 'Slashkig is a Penguin!',
			files: ['./assets/shadow_milk_sing.png'],
		});
	}
	
	if (message.content.toLowerCase().includes('*sips*')) {
		await message.channel.send({
			files: ['./assets/esc_sip.png'],
		});
	}

	if (message.content.toLowerCase() == 'fountgpt is this true?') {
		const responses = [
			'Correct!',
			'It is decidedly so.',
			'Probably.',
			'No doubt about it.',
			'No.',
		];

		const randomResponse = responses[getRandInt(0, responses.length - 1)];
		await message.channel.send(`${randomResponse}`);
	}

});

client.login(token);
