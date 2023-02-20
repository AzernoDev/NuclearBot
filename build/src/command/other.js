"use strict";
const command = require('./commands');
module.exports = [
    new command("ping", "First command", function (client, args, msg) {
        if (args.length > 0) {
            const arg = args.shift();
            if (arg === "type") {
                msg.channel.send(`Command type : ${this.type}`);
            }
        }
        else {
            msg.reply('pong');
        }
    }),
    new command("pong", "First command", function (client, args, msg) {
        if (args.length > 0) {
            const arg = args.shift();
            if (arg === "type") {
                msg.channel.send(`Command type : ${this.type}`);
            }
        }
        else {
            msg.reply('ping');
        }
    }),
    new command("tic", "My friends spammed me to add this shitting command xD", function (client, args, msg) {
        if (args.length > 0) {
            const arg = args.shift();
            if (arg === "type") {
                msg.channel.send(`Command type : ${this.type}`);
            }
        }
        else {
            msg.reply('tac');
        }
    })
];
