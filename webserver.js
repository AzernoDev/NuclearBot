const http = require('http');

const Discord = require('discord.js')
const discordBot = require('./client')
const config = require('./config.json')

http.createServer(async (req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`)
    const key = url.searchParams.get('key');

    if(key !== config.key)
    {
        await res.writeHead(401)
        await res.end();
        return;
    }

    let data = "";
    req.on("data", d => {
        data += d
    })

    switch (url.pathname) {
        case "/linkedChatDiscord/":

            req.on("end", async () => {
               await discordBot.channels.fetch('803674318135099452')
                   .then(async (channel) => {

                       if(!(channel instanceof Discord.TextChannel)) return

                       await channel.send(data).then(async () => {
                           await res.writeHead(200);
                       }).catch(async () => {
                           await res.writeHead(500);
                       });
                   })
                   .catch(async () => {
                       await res.writeHead(500);
                   })

                await res.end();
            })

            break;
        default:

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

                await res.writeHead(200);
                await res.end();
            })

            break;
    }

}).listen(8080)

module.exports = http;