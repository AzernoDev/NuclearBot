// Dummy web server for Heroku
const http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(process.env.PORT || 80);


const config = require('./config.json');

const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    console.log('received message');
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