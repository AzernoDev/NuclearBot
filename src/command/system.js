const command = require('./commands');

module.exports = [
    new command("help", "List and describe all commands", function (client, args, msg) {
        //TODO: create scrypt for help commands
    }),

    new command("uptime", "The elapsed time since the bot was last started", function (client, args, msg) {
        //TODO: Think about a better way of doing things

        let seconds = Math.floor(client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let months = 0;
        let years = 0;

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        let strDate = `I've been running for`;

        strDate += years > 0 ? ` ${years} years,` : ``;
        strDate += months > 0 ? ` ${months} months,` : ``;
        strDate += days > 0 ? ` ${days} days,` : ``;
        strDate += hours > 0 ? ` ${hours} hours,` : ``;
        strDate += minutes > 0 ? ` ${minutes} minutes` : ``;
        strDate += (years > 0 || months > 0 || days > 0 || hours > 0 || minutes > 0) && seconds > 0 ? ` and` : ``;
        strDate += seconds > 0 ? ` ${seconds} seconds` : ``;

        strDate += ` !`;

        msg.reply(strDate);
    })
];