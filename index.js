const config = require('./config.json');
const version = "Beta";

const discord = require('discord.js');
const client = new discord.Client();


client.on('ready', () => {
    let logMessage = `Logged in as \`${client.user.tag}\`!`

    console.log(logMessage);
    client.channels.fetch(config.ErrorChannelID)
        .then(channel => channel.send(logMessage));
    client.user.setStatus('idle');
    client.user.setActivity(
        'Create by ' + client.users.fetch(config.AdminID.Author).name,
        { type: 'PLAYING' })
});

client.on('message', msg => {

    //Check Prefix
    if(!msg.content.startsWith(config.Prefix[version])) return;

    //Delete prefix
    msg.content = msg.content.slice(config.Prefix.length, msg.content.length);

    //Basic command
    if (msg.content === 'ping') {
        msg.reply('Pong!').then();
    }

    //Todo: create extensible command structure
    //Todo: create error ping on specific channel
});

client.login(config.Token[version]).catch(console.error);