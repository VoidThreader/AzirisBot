import discord
import logging
import os
import random as rand
from dotenv import load_dotenv
from discord.ext import commands
from discord import app_commands

load_dotenv()
TOKEN = os.getenv('TOKEN')
PREFIX = os.getenv('PREFIX')
GUILD_ID = discord.Object(id=os.getenv('GUILD_ID'))

rngMode = False; randGenNum = None

handler = logging.FileHandler(filename='discord.log', encoding='utf-8', mode='w')

class Client(commands.Bot):
	async def on_ready(self):
		print(f"All eyes on {self.user.name}!")

		try:
			synced = await self.tree.sync(guild=GUILD_ID)
			print(
				f"Successfully synced {len(synced)} commands to guilds {GUILD_ID.id}\nLet the show BEGIN!"
				)
		except Exception as error:
			print(f"Error syncing commands: {error}")

#	async def on_member_join(self, member):
#		if not member.bot:
#			print(f'{member} server.')
#			await member.send(f"Welcome to Operation:Aziris {member.mention}! Ready for some giggles?") #I'll work on this at a later time

	async def on_message(self, message):
		print(f"Message auth {message.author}: {message.content}")

		if message.author == self.user:
			return
		
		if ':3' in message.content.lower():
			await message.channel.send(file=discord.File('assets/white_lily.png'))

		if 'taking too long' in message.content.lower():
			await message.channel.send(file=discord.File('assets/your_taking_too_long.png'))

		if 'slashkig' in message.content.lower() or 'penguin' in message.content.lower():
			await message.channel.send("Slashkig is a penguin!", file=discord.File('assets/shadow_milk_sing.png'))

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
intents.presences = True
client = Client(command_prefix=PREFIX, intents=intents)

@client.tree.command(
					name="help",
					description="Lists all available commands.",
					guild=GUILD_ID
					)
async def helpCmd(interaction: discord.Interaction):
	embed = discord.Embed(
						title="AzirisBot Commands",
						description="List of all commands found in AzirisBot",
						color=0x4AA8FF,
						)
	embed.add_field(name="/shadowmilk", value="Sends an image of shadow milk cookie.", inline=True)
	embed.add_field(name="/backflip", value="Mystic flour cookie performs backflips.", inline=True)
	embed.add_field(name="/rng", value="Rolls a d20. To start a number guessing game, use 'begin' to start or 'end' to stop.", inline=False)
	embed.add_field(name="/numguess", value="Guess a number from /rng, must be an active game to work.", inline=False)
	await interaction.response.send_message(embed=embed)

@client.tree.command(
					name="shadowmilk", 
					description="Sends an image of shadow milk cookie.",
					guild=GUILD_ID
					)
async def shadowMilkImage(interaction: discord.Interaction):
	await interaction.response.send_message(file=discord.File('assets/shadow_milk_plush.png'))

@client.tree.command(
					name="backflip", 
					description="Mystic flour cookie performs backflips.",
					guild=GUILD_ID
					)
async def shadowMilkImage(interaction: discord.Interaction):
	await interaction.response.send_message(file=discord.File('assets/mfc_backflip.gif'))

@client.tree.command(
					name="rng",
					description="Rolls a d20. To start a number guessing game, use 'begin' to start or 'end' to stop.",
					guild=GUILD_ID
					)
@app_commands.describe(mode="Begin or end the game. Roll to just roll a d20.")
@app_commands.choices(mode=[
        app_commands.Choice(name='roll 20', value='0'),
		app_commands.Choice(name='begin', value='1'),
        app_commands.Choice(name='end', value='2')])
async def rngNum(interaction: discord.Interaction, mode: app_commands.Choice[str]):
	
	global rngMode, randGenNum
	
	if rngMode and mode.value == '1':
		await interaction.response.send_message("Ah! Ah! Ah! A game is already in progress!")
		return
	
	if mode.value == '1':
		
		randGenNum = rand.randint(1, 20)
		rngMode = True
		
		respond = "I rolled a die! Guess which number I got from 1 to 20!"
		print(f"Secret number to guess just for you: {randGenNum} -smc")
	elif mode.value == '2':
		if not rngMode:
			await interaction.response.send_message("There's no game in progress, silly.")
			return

		randGenNum = None
		rngMode = False
		respond = "Game's over!"
	else:
		respond = rand.randint(1, 20)
	
	await interaction.response.send_message(respond)

@client.tree.command(
					name="numguess",
					description="Guess a number from /rng, must be an active game to work.",
					guild=GUILD_ID
					)
@app_commands.describe(guess="Guess an integer")
async def numGuess(interaction: discord.Interaction, guess: int):
	
	global rngMode, randGenNum

	if not rngMode:
		await interaction.response.send_message("There's no game in progress, silly.")
		return

	if guess > randGenNum:
		respond = "WRONG! LOWER!"
	elif guess < randGenNum:
		respond = "WRONG! HIGHER!"
	else:
		respond = "CORRECT! DING DING DING! We have a winner here!"
		randGenNum = None
		rngMode = False

	await interaction.response.send_message(respond)

client.run(TOKEN, log_handler=handler, log_level=logging.DEBUG)