const { getVoiceConnection } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops playing music.'),

  async execute(interaction) {
    const channel = interaction.member.voice.channel;
    if (!channel) {
      return interaction.reply('You need to join a voice channel first.');
    }

    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      return interaction.reply('I am not connected to any voice channel.');
    }

    connection.destroy();

    interaction.reply('Stopped playing.');
  },
};
