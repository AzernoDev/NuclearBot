const client = require('./client');
const config = require('./config.json');

//search and index commands bot
const fs = require('fs');
const commandFiles = fs.readdirSync('./src').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const tmpCommands = require(`./src/${file}`);
    const type = file.split('.')[0];

    for(const command of tmpCommands) {
        command.type = type;
        client.commands.set(command.name, command);
    }
}

client.on('ready', async () => {

    client.log = await client.channels.fetch(config.channel.log);
    client.error = await client.channels.fetch(config.channel.error);

    const logMsg = `[${await dateToString(new Date())}] - Logged in as \`${client.user.tag}\``;
    console.log(logMsg);
    client.log.send(logMsg);

    client.creator = await client.users.fetch(config.authorID);
    await client.user.setPresence({
        status: 'online',
        activity: {
            name: `Create by ${client.creator.tag}`,
            type: 'PLAYING',
            url: 'https://www.twitch.tv/azern0'
        }
    });

    client.securityKey = config.key;
    require('./webserver');
});

// Called if whenever message is created
client.on('message', async msg => {

    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).split(' ');
    for(let i = 0; i < args.length; i++) {
        args[i] = args[i].toLowerCase();
    }

    const command = args.shift();

    if(!client.commands.has(command)) return;
    client.commands.get(command).method(client, args, msg);
});

// Called if the bot have any error
client.on("error", error => {

    const errorMsg = `client's WebSocket encountered a connection error: ${error}`
    console.error(errorMsg);
    client.error.send(errorMsg);
});

client.login(config.token).catch(r => console.error(r));

async function dateToString(_date)
{
    return `${_date.getUTCFullYear()}-${_date.getUTCMonth()+1}-${_date.getUTCDate()} T:${_date.getUTCHours()}:${_date.getUTCMinutes()}:${_date.getUTCSeconds()} UTC`
}