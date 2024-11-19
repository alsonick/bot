/**
 * Logs if an interaction has failed.
 * @param {CommandInteraction} interaction - Represents a command interaction.
 * @param {Error} error - The error object.
 * @param {Client} client - The error object.
 */

const interactionError = async (interaction, error) => {
    await interaction.reply('Something went wrong with the request.');
    console.error('Error:', error.message);
};

module.exports = {
    interactionError,
};