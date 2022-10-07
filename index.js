import app from './firebase/firebase.js';
import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
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

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  const prefix = getPrefix();
  const command = message.content.split(' ');

  console.log(message.content);
});

client.login(process.env.DISCORD_TOKEN);