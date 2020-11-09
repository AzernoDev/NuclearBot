const command = require('../template')

module.exports = [
    new command("ping", "First command", (client, args, msg) => {
        msg.reply('pong');
    })]