const Discord = require('discord.js')
const client = new Discord.Client();

client.commands = new Discord.Collection();

module.exports = client;

Discord.Cli