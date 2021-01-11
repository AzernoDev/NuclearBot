const http = require('http');
const discordBot = require('./client')
const Discord = require('discord.js')

http.createServer(async (req, res) => {
    let data = "";
    req.on("data", d => {
        data += d
    })

    req.on("end",async () => {
        console.log(data);

        let channel = await discordBot.channels.fetch('798276136391147601');

        if(!(channel instanceof Discord.TextChannel)) return
        let message = await channel.messages.fetch('798280707918528522')

        if(!(message instanceof Discord.Message)) return
        await message.edit(data);

        res.writeHead(200);
        res.end();
    })
}).listen(8080)

module.exports = http;