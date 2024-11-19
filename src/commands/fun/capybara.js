const { interactionError } = require('../../lib/interaction-error');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { THEME } = require('../../lib/constants');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('capybara')
		.setDescription('Replies with pictures of random capybaras.'),
	async execute(interaction) {
        const url = 'https://api.capy.lol/v1/capybara?json=true';

        try {
            const response = await axios.get(url);

            const index = response.data.data.index;
            const image = response.data.data.url;

            const capybaraEmbed = new EmbedBuilder()
                .setColor(THEME)
                .setTitle('Capybara | capy.lol')
                .setURL(`https://api.capy.lol/v1/capybara/${index}`)
                .setImage(image);

            interaction.reply({ embeds: [capybaraEmbed] });
        } catch (error) {
            await interactionError(interaction, error);
        }
	},
};