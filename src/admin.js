const command = require('../commands');

module.exports = [
    new command("msg", "Admin: can send a personnal msg on specifict channel with id", async function (client, args, msg) {
        if(msg.author.id !== client.author || args[0] === undefined || args[1] === undefined) return;

        const targetChannel = await client.channels.fetch(args[0]);
        args.shift();

        if(targetChannel === undefined) {
            msg.reply("Target channel error : undefined");
            return;
        }

        let msgSend = '';
        for(const arg of args)
        {
            msgSend += (arg + ' ');
        }

        targetChannel.send(msgSend);
    })
]