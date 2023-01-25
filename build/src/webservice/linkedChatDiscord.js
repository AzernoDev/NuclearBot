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
const Discord = require('discord.js');
const discordBot = require('../../client');
let dataBuffer = [];
let channelDstID;
let maxLength = 2000;
module.exports.addToBuffer = function (data, channelID) {
    if (typeof data !== "string")
        return 400;
    if (!data.endsWith("\n"))
        data += "\n";
    // Adding data in the buffer
    if (dataBuffer.length <= 0 ||
        dataBuffer[dataBuffer.length - 1].length + data.length > maxLength) {
        dataBuffer.push(data);
    }
    else {
        dataBuffer[dataBuffer.length - 1] += data;
    }
    console.log(dataBuffer);
    channelDstID = channelID;
    return 200;
};
function SendMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dataBuffer.length <= 0)
            return;
        let msg = dataBuffer.shift();
        yield discordBot.channels.fetch(channelDstID)
            .then((channel) => __awaiter(this, void 0, void 0, function* () {
            if (!(channel instanceof Discord.TextChannel))
                return;
            yield channel.send(msg);
            console.log(dataBuffer);
        }));
    });
}
discordBot.setInterval(SendMessage, 1000);
