const command = require('../commands')

module.exports = [
    new command("ping", "First command", function (client, args, msg) {

        if(args.length > 0) {
            const arg = args.shift();

            if(arg === "type")
            {
                msg.channel.send(`Command type : ${this.type}`)
            }
        } else {
            msg.reply('pong');
        }
    }),

    new command("tic", "My friend spam me for add this shitting command xD", function (client, args, msg) {

        if(args.length > 0) {
            const arg = args.shift();

            if(arg === "type")
            {
                msg.channel.send(`Command type : ${this.type}`)
            }
        } else {
            msg.reply('tac');
        }
    })
]