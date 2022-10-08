import * as dotenv from 'dotenv';
import UserConfig from './configs/userConfig.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { Command } from './models/command.js';
import { getPlayer, Player, registerPlayer } from './models/player.js';
import { getPrefix } from './configs/prefix.js';
import { replyEmbedMessage, sendTextMessage } from './services/messages.js';
import { buildProfileEmbedMessage } from './services/buildReplies.js';
import { getReplies } from './configs/replies.js';

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

  switch (command.getCommandWithLevel(1)) {
    case "profile":
      getPlayer(message.author.id)
        .then(snapshot => {
          let playerData = snapshot.data();
          
          if (playerData) {
            replyEmbedMessage(message, buildProfileEmbedMessage(message.author, playerData));
          } else {
            sendTextMessage(message, `You are not registered! type '${getPrefix()} register' to register`);
          }
        })
      break;

    case "register":
      getPlayer(message.author.id)
        .then(snapshot => {
          if (snapshot.data()) {
            sendTextMessage(message, getReplies().register.registerFail.alreadyRegistered);
          } else {
            const newPlayer = new Player.Builder()
              .setId(message.author.id)
              .build();

            registerPlayer(newPlayer)
              .then((docRef) => {
                sendTextMessage(message, getReplies().register.registerSuccess);
              });
          }
        })
      break;
  }


});

client.login(process.env.DISCORD_TOKEN);