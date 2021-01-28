const Discord = require('discord.js')

let msgBuffer = [""]
let channelDst

function SendMessage() {
    let msg = msgBuffer.shift()

    msg += `${msg.length}\n`

    if(channelDst instanceof Discord.TextChannel) channelDst.send(msg).then(() => {})
}

setTimeout(SendMessage, 1000)

module.exports.addToBuffer = function (data) {
    if (typeof data !== "string") return 400
    if (!data.endsWith("\n")) data += "\n"

    //Check where the data will be added
    let i = 0;
    while (msgBuffer[i] !== undefined && msgBuffer[i].length + data.length > 20) i++

    //Adding data in the buffer
    if(msgBuffer[i] !== undefined) msgBuffer[i] += data
    else msgBuffer.push(data)

    return 200
}


module.exports.init = function (channel) {
    if (!(channel instanceof Discord.TextChannel)) {
        console.error("linkedChatDiscord : channel not a instance of Discord Text Channel");
        return;
    }

    channelDst = channel;
}