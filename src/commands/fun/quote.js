const { interactionError } = require('../../lib/interaction-error');
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Replies with a of random quotes.'),
	async execute(interaction) {
        const url = 'https://api.quotable.io/random';

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const quote = response.data.content;
            const author = response.data.author;

            const string = `"${quote}" - ${author}`;

            await interaction.reply(string);
        } catch (error) {
            await interactionError(interaction, error);
        }
	},
};