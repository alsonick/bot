const { interactionError } = require('../../lib/interaction-error');
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('facts')
		.setDescription('Replies with tons of random interesting facts about cool topics.'),
	async execute(interaction) {
        const url = 'https://api.api-ninjas.com/v1/facts';

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-Api-Key': process.env.API_NINJAS_API_KEY,
                },
            });

            const fact = response.data[0].fact;

            await interaction.reply(fact);
        } catch (error) {
            await interactionError(interaction, error);
        }
	},
};