const config = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    let logMsg = `Logged in as \`${client.user.tag}\`!`

    console.log(logMsg);
    SendLog(logMsg);

    //TODO: Set personal status
    client.user.setStatus('idle').then(r => SendError(r));
    client.user.setActivity(
        'Create by ' + client.users.fetch(config.AdminID).name,
        {type: 'PLAYING'}).then(r => SendError(r))
 });

client.on('message', msg => {

    //Check Prefix
    if(!msg.content.startsWith(config.Prefix)) return;

    //Delete prefix
    msg.content = msg.content.slice(config.Prefix.length, msg.content.length);

    let msgArray = msg.content.split(' ');

    //Basic command
    if (msgArray[0] === 'ping') {
        msg.reply('Pong!').then(r => SendError(r));
    }

    console.log(msg.content);
    //Todo: Create extensible command structure
    //Todo: Create error ping on specific channel
});

function SendLog(_msg)
{
    client.channels.fetch(config.Channel.Log).then(channel => channel.send(_msg));
}

function SendError(_msg)
{
    client.channels.fetch(config.Channel.Error).then(channel => channel.send(_msg));
}

client.login(config.Token).then(r => console.error(r));