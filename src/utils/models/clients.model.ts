import { Client, ClientOptions } from "discord.js";
import { Command } from "./commands.model";

export class NuclearRobotClient extends Client {
	public commands: Set<Command> = new Set<Command>();
	constructor(options: ClientOptions, commands?: Set<Command>) {
		super(options);

		if (!commands) return;
		this.commands = commands;
	}
}