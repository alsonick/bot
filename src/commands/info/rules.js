/* eslint-disable no-trailing-spaces */
const { SlashCommandBuilder } = require('discord.js');
const { THEME } = require('../../lib/constants');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Replies with all the rules for the server!'),
	async execute(interaction) {
		const url = 'https://notnick.io/api/community/rules';

		try {
			const response = await axios.get(url);

			// Sample Response
            // {
            //   "success": true, 
            //   "rules": [
			//	   {	
            //       "id": 0
			//		 "number": 0
			//		 "title": ""
			//		 "text": ""
			//     }
            //   ],
			//   "count": 0
            // }


			const data = response.data;

			if (!data.success) {
				return interaction.reply(data.error);
			}

			const rules = [];

			for (const rule of data.rules) {
				rules.push({ name: `${rule.number}. ${rule.title}`, value: rule.text });
			}

			const rulesEmbed = new EmbedBuilder()
				.setColor(THEME)
				.setTitle('Nicholas | Community Rules')
				.setURL('https://notnick.io/api/community/rules')
				.addFields(...rules);

			interaction.reply({ embeds: [rulesEmbed] });

		} catch (error) {
            await interaction.reply(`Something went wrong with the request. Please try again later.\n\n**Error:** ${error.message}`);
            console.error('Error:', error.message);
		}
	},
};