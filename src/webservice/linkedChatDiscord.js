const Discord = require('discord.js')
const discordBot = require('../../client')

let dataBuffer = []
let channelDstID
let maxLength = 2000;

module.exports.addToBuffer = function (data, channelID) {
    if (typeof data !== "string") return 400
    if (!data.endsWith("\n")) data += "\n"

    // Adding data in the buffer
    if(dataBuffer.length <= 0 ||
        dataBuffer[dataBuffer.length - 1].length + data.length > maxLength) {
        dataBuffer.push(data)
    }
    else {
        dataBuffer[dataBuffer.length - 1] += data;
    }

    console.log(dataBuffer)
    channelDstID = channelID

    return 200
}

async function SendMessage() {

    if(dataBuffer.length <= 0) return
    let msg = dataBuffer.shift()

    await discordBot.channels.fetch(channelDstID)
        .then(async channel => {
            if(!(channel instanceof Discord.TextChannel)) return

            await channel.send(msg)
            console.log(dataBuffer)
        })
}

discordBot.setInterval(SendMessage, 1000);