const { THEME, DOMAIN, BOT_NAME } = require('../../lib/constants');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dev')
		.setDescription(`The dev info for my site (${DOMAIN}).`),
	async execute(interaction) {
        const url = `https://${DOMAIN}/api/dev`;

		try {
            const response = await axios.get(url);

            const data = response.data;

            if (!data.success) {
				return interaction.reply(data.error);
			}

            const dev = [];

            for (const d of Object.entries(data.dev)) {
                dev.push({ name: `${d[0]}:`, value: `${d[1]}`, inline: true });
            }

            const devEmbed = new EmbedBuilder()
                .setColor(THEME)
                .setTitle('Nicholas F&F | Dev')
                .setURL(`https://${DOMAIN}/api/dev`)
                .addFields(...dev)
				.setTimestamp()
                .setFooter({ text: `${BOT_NAME} | Dev`, iconURL: `https://${DOMAIN}/Avatar.png` });

            interaction.reply({ embeds: [devEmbed] });

		} catch (error) {
			await interaction.reply(`Something went wrong with the request. Please try again later.\n\n**Error:** ${error.message}`);
            console.error('Error:', error.message);
		}
	},
};