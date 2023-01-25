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
const http = require('http');
const Discord = require('discord.js');
const discordBot = require('../../client');
const config = require('../../config.json');
const linkedChatDiscord = require('./linkedChatDiscord');
http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const key = url.searchParams.get('key');
    if (key !== config.key) {
        yield res.writeHead(401);
        yield res.end();
        return;
    }
    let data = "";
    req.on("data", d => {
        data += d;
    });
    switch (url.pathname) {
        case "/linkedChatDiscord/":
            req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
                yield res.writeHead(linkedChatDiscord.addToBuffer(data, config.linkedChannel));
                yield res.end();
            }));
            break;
        default:
            req.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
                yield discordBot.channels.fetch('798276136391147601')
                    .then((channel) => __awaiter(void 0, void 0, void 0, function* () {
                    if (!(channel instanceof Discord.TextChannel))
                        return;
                    yield channel.messages.fetch({ limit: 1 })
                        .then((messages) => __awaiter(void 0, void 0, void 0, function* () {
                        let lastMessage = messages.first();
                        if (!(lastMessage instanceof Discord.Message) &&
                            lastMessage.author.id !== discordBot.id)
                            return;
                        yield lastMessage.edit("```" + data + "```");
                    })).catch(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield channel.send("```" + data + "```");
                    }));
                }));
                yield res.writeHead(200);
                yield res.end();
            }));
            break;
    }
})).listen(parseInt(config.port));
module.exports = http;
