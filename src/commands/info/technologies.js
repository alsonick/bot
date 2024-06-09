const { THEME, DOMAIN, BOT_NAME, AVATAR } = require('../../lib/constants');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('technologies')
		.setDescription('Replies with the list of technologies I use!'),
	async execute(interaction) {
        const url = `https://${DOMAIN}/api/technologies`;

		try {
            const response = await axios.get(url);

            const data = response.data;

            if (!data.success) {
				return interaction.reply(data.error);
			}

            const technologies = [];

            for (const technology of data.technologies) {
                technologies.push({ name: technology.text, value: technology.desc, inline: true });
            }

            const technologiesEmbed = new EmbedBuilder()
                .setColor(THEME)
                .setThumbnail(`https://${DOMAIN}/${AVATAR}`)
                .setTitle('Nicholas F&F | Technologies')
                .setURL(`https://${DOMAIN}/api/technologies`)
                .addFields(...technologies)
				.setTimestamp()
                .setFooter({ text: `${BOT_NAME} | Technologies`, iconURL: `https://${DOMAIN}/${AVATAR}` });

            interaction.reply({ embeds: [technologiesEmbed] });

		} catch (error) {
			await interaction.reply(`Something went wrong with the request. Please try again later.\nError: ${error.message}`);
            console.error('Error:', error.message);
		}
	},
};