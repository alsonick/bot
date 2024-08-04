const { SlashCommandBuilder } = require('discord.js');
const { interactionError } = require('../../lib/interaction-error');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		try {
			await interaction.reply('Pong!');
		} catch (error) {
			await interactionError(interaction, error);
		}
	},
};