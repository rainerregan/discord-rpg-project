import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import { Command } from './models/command.js';
import { getPlayer, Player, registerPlayer } from './models/player.js';
import { getPrefix } from './configs/prefix.js';
import { replyEmbedMessage, sendTextMessage } from './services/messages.js';
import { buildProfileEmbedMessage } from './services/buildReplies.js';
import { getReplies } from './configs/replies.js';
import { adventure } from './actions/adventure.js';

// Run .env configuration
dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

// Handle Message
client.on('messageCreate', message => {
  if (message.author.bot) return; // If the message comes from bot, ignore.

  const command = new Command(message.content);

  if (!command.checkPrefix()) return; // If the prefix is not matched.

  getPlayer(message.author.id)
    .then(snapshot => {
      let playerData = snapshot.data();

      if (playerData) {
        switch (command.getCommandWithLevel(1)) {
          case "profile":
            replyEmbedMessage(message, buildProfileEmbedMessage(message.author, playerData));
            break;
          case "register":
            sendTextMessage(message, getReplies().register.registerFail.alreadyRegistered);
            break;
          case "inv":
            sendTextMessage(message, "Inventory")
            break;
          case "adv":
            adventure(message, playerData);
            break;
        }
      }
      else {
        switch (command.getCommandWithLevel(1)) {
          case "profile":
            sendTextMessage(message, `You are not registered! type '${getPrefix()} register' to register`);
            break;
          case "register":
            const newPlayer = new Player.Builder()
              .setId(message.author.id)
              .build();

            registerPlayer(newPlayer)
              .then((docRef) => {
                sendTextMessage(message, getReplies().register.registerSuccess);
              });
            break;
        }
      }
    });


});

client.login(process.env.DISCORD_TOKEN);