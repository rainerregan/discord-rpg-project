require('dotenv').config();
const {Client, IntentsBitField} = require("discord.js");
const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages
    ]
});

client.on("ready", () =>{
    console.log("The bot is online"); //message when bot is online
});
client.login(process.env.CLIENT_TOKEN);