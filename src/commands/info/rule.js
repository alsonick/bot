const { SlashCommandBuilder } = require('discord.js');
const { THEME } = require('../../lib/constants');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rule')
		.setDescription('Replies with the requested rule.')
        .addStringOption(option =>
            option.setName('rule')
                .setDescription('Which rule would you like to read?'),
        ),
	async execute(interaction) {
		try {
            const ruleStringFormat = interaction.options.getString('rule');
            const ruleNumberFormat = Number(ruleStringFormat);

            if (Number.isNaN(ruleNumberFormat)) {
                return await interaction.reply('Please enter a valid number.');
            }

            if (ruleNumberFormat < 1 || ruleNumberFormat > 10) {
                return await interaction.reply('There are only 10 rules.');
            }

            const url = `https://notnick.io/api/community/rules?r=${ruleNumberFormat}`;

            const response = await axios.get(url);

            const data = response.data;

            if (!data.success) {
                return interaction.reply(data.error);
            }

            const rule = data.rule;

            const rulesEmbed = new EmbedBuilder()
                .setColor(THEME)
                .setTitle(`Nicholas | Community Rules | Rule ${rule.number}`)
                .setURL(`https://notnick.io/api/community/rules?r=${ruleNumberFormat}`)
                .addFields({ name: `${rule.number}. ${rule.title}`, value: rule.text })
                .setTimestamp()
                .setFooter({ text: 'Nicholas FnF', iconURL: 'https://notnick.io/branding/sig_avatar_one.png' });

            interaction.reply({ embeds: [rulesEmbed] });

		} catch (error) {
			await interaction.reply(`Something went wrong with the request. Please try again later.\n\n**Error:** ${error.message}`);
            console.error('Error:', error.message);
		}
	},
};