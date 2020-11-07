const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

let author;
let channels = {log: undefined, error: undefined}

client.on('ready', async () => {

    channels.log = await client.channels.fetch(config.Channel.Log);
    channels.error = await client.channels.fetch(config.Channel.Error);

    let logMsg = `[${await dateToString(new Date())}] - Logged in as \`${client.user.tag}\``;
    console.log(logMsg);
    channels.log.send(logMsg);

    author = await client.users.fetch(config.AdminID);
    await client.user.setPresence({
        status: 'online',
        activity: {
            name: `Create by ${author.tag}`,
            type: 'PLAYING',
            url: 'https://www.twitch.tv/azern0'
        }
    });
});

// Called if whenever message is created
client.on('message', async msg => {

    if (!msg.content.startsWith(config.Prefix) || msg.author.bot) return;
    const args = msg.content.slice(config.Prefix.length).split(' ');

    if(args[0] === 'ping') await msg.reply('pong');

    //TODO: Add commands array
});

// Called if the bot have any error
client.on("error", error => {

    const errorMsg = `client's WebSocket encountered a connection error: ${error}`
    console.error(errorMsg);
    channels.error.send(errorMsg);
});

client.login(config.Token).catch(r => console.error(r));

async function dateToString(_date)
{
    return `${_date.getUTCFullYear()}-${_date.getUTCMonth()+1}-${_date.getUTCDate()} T:${_date.getUTCHours()}:${_date.getUTCMinutes()}:${_date.getUTCSeconds()} GMT`
}