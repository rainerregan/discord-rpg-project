import { EmbedBuilder, Message } from "discord.js";

/**
 * Reply message to user.
 * @param {Message} message 
 * @param {object} content 
 */
export const replyTextMessage = function (message, content) {
    message.reply({
        content: content,
        allowedMentions: {
            repliedUser: false
        }
    });
}

/**
 * Reply message to user with embed message.
 * @param {Message} message 
 * @param {EmbedBuilder} embed 
 */
export const replyEmbedMessage = function (message, embed) {
    message.reply({
        embeds: [embed],
        allowedMentions: {
            repliedUser: false
        }
    });
}

/**
 * Send message without replying
 * @param {Message} message 
 * @param {object} content 
 */
export const sendTextMessage = function (message, content) {
    return message.channel.send({
        content: content,
    });
}