import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits, User } from 'discord.js';
import Command from './models/command.js';
import { getPlayer, Player, registerPlayer } from './models/player.js';
import userConfig from './configs/userConfig.json' assert { type: 'json' };
import { getPrefix } from './services/prefix.js';

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

const replyMessage = function (message, content) {
  message.reply({
    content: content,
    allowedMentions: {
      repliedUser: false
    }
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

// Handle Message
client.on('messageCreate', message => {
  if (message.author.bot) return; // If the message comes from bot, ignore.

  const command = new Command(message.content);

  if (!command.checkPrefix()) return; // If the prefix is not matched.

  switch (command.getCommandWithLevel(1)) {
    case "p":
      getPlayer(message.author.id)
        .then(snapshot => {
          if (snapshot.data()) {
            replyMessage(message, "Profile");
          } else {
            replyMessage(message, `You are not registered! type '${getPrefix()} register' to register`);
          }
        })
      break;

    case "register":
      getPlayer(message.author.id)
        .then(snapshot => {
          if (snapshot.data()) {
            replyMessage(message, "You are already registered!");
          } else {
            const newPlayer = new Player(message.author.id, userConfig.userStartingMoney);
            registerPlayer(newPlayer)
              .then((docRef) => {
                replyMessage(message, "You are now registered!");
              })
          }
        })
      break;
  }


});

client.login(process.env.DISCORD_TOKEN);