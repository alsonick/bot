const { Events, PresenceUpdateStatus } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    /**
     * Logs the client in and sets the status to Do Not Disturb.
     * @param {Client} client - The client object.
     */
    async execute(client) {
        try {
            await client.user.setStatus(PresenceUpdateStatus.DoNotDisturb);

            console.log(`Ready! Logged in as ${client.user.tag}.`);
        } catch (error) {
            console.error('Error setting status:', error);
        }
    },
};
