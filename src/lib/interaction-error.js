/**
 * Logs if an interaction has failed.
 * @param {CommandInteraction} interaction - Represents a command interaction.
 * @param {Error} error - The error object.
 */

const interactionError = async (interaction, error) => {
    await interaction.reply(`Something went wrong with the request. Please try again later.\nError: ${error.message}`);
    console.error('Error:', error.message);
};

module.exports = {
    interactionError,
};