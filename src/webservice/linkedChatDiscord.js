const Discord = require('discord.js')
const discordBot = require('../../client')

let msgBuffer = [""]
let channelDstID

module.exports.addToBuffer = function (data, channelID) {
    if (typeof data !== "string") return 400
    if (!data.endsWith("\n")) data += "\n"

    //Check where the data will be added
    let i = 0;
    while (msgBuffer[i] !== undefined && msgBuffer[i].length + data.length > 20) i++

    //Adding data in the buffer
    if(msgBuffer[i] !== undefined) msgBuffer[i] += data
    else msgBuffer.push(data)

    channelDstID = channelID

    console.log(msgBuffer)

    return 200
}

async function SendMessage() {

    let msg = msgBuffer.shift()

    msg += `${msg.length}\n`

    await discordBot.channels.fetch(channelDstID)
        .then(async channel => {
            if(!(channel instanceof Discord.TextChannel)) return

            await channel.send(msg)
            console.log("Message sent")
        })
}

//TODO: trouver comment appeler régulièrement SendMessage pendant toute la durée du programme sans le bloquer