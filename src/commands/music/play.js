const { AudioPlayerStatus, createAudioPlayer, createAudioResource, VoiceConnectionStatus, joinVoiceChannel } = require('@discordjs/voice');
const { THEME, DOMAIN, BOT_NAME, AVATAR } = require('../../lib/constants');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const ytdl = require('@distube/ytdl-core');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music from YouTube.')
    .addStringOption(option =>
      option.setName('url')
        .setDescription('The YouTube link of the song to play.')
        .setRequired(true)),

  async execute(interaction) {
    const url = interaction.options.getString('url');

    if (!ytdl.validateURL(url)) {
      return interaction.reply('Please provide a valid link!');
    }

    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply('You need to join a voice channel first!');
    }

    try {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The bot has connected to the channel.');
      });

      const player = createAudioPlayer();
      connection.subscribe(player);

      const stream = ytdl(url, { filter: 'audioonly' });
      const resource = createAudioResource(stream);

      player.play(resource);

      player.on(AudioPlayerStatus.Idle, () => {
        connection.disconnect();
      });

      const videoInfo = await ytdl.getInfo(url);

      const songEmbed = new EmbedBuilder()
        .setColor(THEME)
        .setTitle(`Now Playing: ${videoInfo.videoDetails.title}`)
        .setDescription(`[${videoInfo.videoDetails.title}](${url})`)
        .setThumbnail(videoInfo.videoDetails.thumbnails[0].url)
        .setTimestamp()
        .setFooter({ text: `${BOT_NAME} | Playing`, iconURL: `https://${DOMAIN}/${AVATAR}` });

      interaction.reply({ embeds: [songEmbed] });
    } catch (error) {
        console.log(error);
      console.error('Error while playing music:', error);
      interaction.reply('There was an error trying to play the music!');
    }
  },
};
