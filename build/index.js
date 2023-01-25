"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const client = require('./client');
const config = require('./config.json');
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    client.token = config.token;
    //search and index commands bot
    const fs = require('fs');
    const commandPath = './src/command';
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        if (file !== 'commands.js') {
            const tmpCommands = require(`${commandPath}/${file}`);
            const type = file.split('.')[0];
            for (const command of tmpCommands) {
                command.type = type;
                client.commands.set(command.name, command);
            }
        }
    }
    client.log = yield client.channels.fetch(config.channel.log);
    client.error = yield client.channels.fetch(config.channel.error);
    const logMsg = `[${yield dateToString(new Date())}] - Logged in as \`${client.user.tag}\``;
    console.log(logMsg);
    client.log.send(logMsg);
    client.creator = yield client.users.fetch(config.authorID);
    yield client.user.setPresence({
        status: 'online',
        activity: {
            name: `Create by ${client.creator.tag}`,
            type: 'PLAYING',
            url: 'https://www.twitch.tv/azern0'
        }
    });
    require('./src/webservice/webserver');
}));
// Called if whenever message is created
client.on('message', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot)
        return;
    const args = msg.content.slice(config.prefix.length).split(' ');
    for (let i = 0; i < args.length; i++) {
        args[i] = args[i].toLowerCase();
    }
    const command = args.shift();
    if (!client.commands.has(command))
        return;
    client.commands.get(command).method(client, args, msg);
}));
// Called if the bot have any error
client.on("error", error => {
    const errorMsg = `client's WebSocket encountered a connection error: ${error}`;
    console.error(errorMsg);
    client.error.send(errorMsg);
});
client.login(config.token).catch(r => console.error(r));
function dateToString(_date) {
    return __awaiter(this, void 0, void 0, function* () {
        return `${_date.getUTCFullYear()}-${_date.getUTCMonth() + 1}-${_date.getUTCDate()} T:${_date.getUTCHours()}:${_date.getUTCMinutes()}:${_date.getUTCSeconds()} UTC`;
    });
}
