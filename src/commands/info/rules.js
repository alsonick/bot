/* eslint-disable no-trailing-spaces */
const { THEME, DOMAIN, BOT_NAME, AVATAR } = require('../../lib/constants');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Replies with all the rules for the server!'),
	async execute(interaction) {
		const url = `https://${DOMAIN}/api/community/rules`;

		try {
			const response = await axios.get(url);

			const data = response.data;

			if (!data.success) {
				return await interaction.reply(data.error);
			}

			const rules = [];

			for (const rule of data.rules) {
				rules.push({ name: `${rule.number}. ${rule.title}`, value: rule.text });
			}

			const rulesEmbed = new EmbedBuilder()
				.setColor(THEME)
				.setThumbnail(`https://${DOMAIN}/${AVATAR}`)
				.setTitle('Nicholas F&F | Community Rules')
				.setURL(`https://${DOMAIN}/api/community/rules`)
				.addFields(...rules)
				.setTimestamp()
                .setFooter({ text: `${BOT_NAME} | Community Rules`, iconURL: `https://${DOMAIN}/${AVATAR}` });

			interaction.reply({ embeds: [rulesEmbed] });

		} catch (error) {
            await interaction.reply(`Something went wrong with the request. Please try again later.\nError: ${error.message}`);
            console.error('Error:', error.message);
		}
	},
};