const config = require('./config.json');

const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    //Check Prefix
    if(msg.content.startsWith(config.Prefix)) return;

    //Delete prefix
    msg.content = msg.content.slice(config.Prefix.length, msg.content.length);

    //Basic command
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(config.Token);