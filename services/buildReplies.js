import { EmbedBuilder, User } from "discord.js";
import { getPlayer, Player } from "../models/player.js";

/**
 * Build embeded profile message.
 * @param {User} user Discord User Class
 * @param {Player} playerData Firebase playerdata class
 */
export const buildProfileEmbedMessage = function(user, playerData){
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(user.username)
        .setAuthor({ name: `${user.username} profile`, iconURL: user.avatarURL() })
        .setThumbnail(user.avatarURL())
        .addFields(
            { 
                name: 'STATS', 
                value: 
                    `
                    Level: 1
                    XP: 0
                    `
            },
            { 
                name: 'MONEY', 
                value: 
                    `
                    Silver: ${playerData.silver}
                    `
            },
        );

    return embed;
}