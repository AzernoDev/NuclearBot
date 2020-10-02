const config = require('./config.json');
const version = "Beta";

const discord = require('discord.js');
const client = new discord.Client();

const commandTemplate = require('./src/template');
let commands;

client.on('ready', () => {
    let logMessage = `Logged in as \`${client.user.tag}\`!`

    console.log(logMessage);
    client.channels.fetch(config.LogChannelID)
        .then(channel => channel.send(logMessage));

    //TODO: Set personal status
    client.user.setStatus('idle');
    client.user.setActivity(
        'Create by ' + client.users.fetch(config.AdminID.Author).name,
        { type: 'PLAYING' })
});

client.on('message', msg => {

    //Check Prefix
    if(!msg.content.startsWith(config.Prefix[version])) return;

    //Delete prefix
    msg.content =
        msg.content.slice(config.Prefix[version].length, msg.content.length);

    let msgArray = msg.content.split(' ');

    //Basic command
    if (messageArray[0] === 'ping') {
        msg.reply('Pong!').then();
    }

    commands = {
        'test': new commandTemplate('test', () => {
            client.channels.fetch(config.TestChannelID)
                .then(channel => channel.send("ceci est un test"));
        })
    }

    console.log(msg.content);
    commands[msgArray[0]].method(msgArray);
    //Todo: Create extensible command structure
    //Todo: Create error ping on specific channel
});

client.login(config.Token[version]).catch(r => console.error(r));