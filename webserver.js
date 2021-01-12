const http = require('http');

const discordBot = require('./client')
const Discord = require('discord.js')

http.createServer(async (req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`)
    const key = url.searchParams.get('key');

    if(key !== discordBot.securityKey)
    {
        res.writeHead(401)
        res.end();
        return;
    }

    let data = "";
    req.on("data", d => {
        data += d
    })

    req.on("end", async () => {
        await discordBot.channels.fetch('798276136391147601')
            .then(async (channel) => {

                if (!(channel instanceof Discord.TextChannel)) return
                await channel.messages.fetch({limit: 1})
                    .then(async (messages) => {
                        let lastMessage = messages.first();

                        if (!(lastMessage instanceof Discord.Message) &&
                            lastMessage.author.id !== discordBot.id) return
                        await lastMessage.edit("```" + data + "```");
                    }).catch(async () => {

                        await channel.send("```" + data + "```")
                    })
            })

        res.writeHead(200);
        res.end();
    })
}).listen(8080)

module.exports = http;