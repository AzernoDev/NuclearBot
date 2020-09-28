const config = require('./config.json');

const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    //Todo: check prefix

    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(config.Token);