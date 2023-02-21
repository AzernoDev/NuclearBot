import {Client, Events, GatewayIntentBits} from "discord.js";
import {validateEnv} from "./utils/validator/validateEnv";

(async () => {
    if (!validateEnv()) return;
    const client = new Client({intents: [GatewayIntentBits.Guilds]});

    client.once(Events.ClientReady, _client => {
        console.log(`Ready! Logged in as ${_client.user.tag}`);
    });

    await client.login(process.env.CLIENT_TOKEN);
})();
