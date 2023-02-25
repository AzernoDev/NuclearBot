import { Collection, Events, GatewayIntentBits } from "discord.js";
import { validateEnv } from "./utils/validators/validateEnv";
import { Command } from "./utils/models/commands.model";
import { NuclearRobotClient } from "./utils/models/clients.model";


(async () => {
	if(!validateEnv()) return;
	const client = new NuclearRobotClient({ intents: [ GatewayIntentBits.Guilds ] });
	// client.commands?.push(new Command({
	// 	name: 'ping';
	// 	execute:
	// }))

	client.once(Events.ClientReady, _client => {
		console.log(`Ready! Logged in as ${_client.user.tag}`);
	});

	client.on(Events.ChannelCreate, interaction => {
		console.log(interaction);
	});

	await client.login(process.env.CLIENT_TOKEN);
})();