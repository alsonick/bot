const { Events, PresenceUpdateStatus } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};