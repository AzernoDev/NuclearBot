const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

client.on('ready', () => {
    let logMsg = `Logged in as ${client.user.tag}!`;

    console.log(logMsg);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!').then(r => console.log(r));
    }
});

client.login(config.Token).catch(r => console.log(r));