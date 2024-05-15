const { THEME, DOMAIN, BOT_NAME, AVATAR } = require('../../lib/constants');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rags')
		.setDescription('A collection of my favorite ragtime compositions.'),
	async execute(interaction) {
        const url = `https://${DOMAIN}/api/rags`;

		try {
            const response = await axios.get(url);

            const data = response.data;

            if (!data.success) {
				return interaction.reply(data.error);
			}

            const rags = [];

            for (const rag of data.rags) {
                rags.push({ name: `${rag.title} (${rag.date})`, value: rag.composer, inline: true });
            }

            const ragsEmbed = new EmbedBuilder()
                .setColor(THEME)
                .setTitle('Nicholas F&F | Rags')
                .setURL(`https://${DOMAIN}/rags`)
                .addFields(...rags)
				.setTimestamp()
                .setFooter({ text: `${BOT_NAME} | Rags`, iconURL: `https://${DOMAIN}/${AVATAR}` });

            interaction.reply({ embeds: [ragsEmbed] });

		} catch (error) {
			await interaction.reply(`Something went wrong with the request. Please try again later.\n\n**Error:** ${error.message}`);
            console.error('Error:', error.message);
		}
	},
};