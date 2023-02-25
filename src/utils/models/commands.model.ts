export interface CommandConfiguration {
	name: string;
	execute: Function;
	description?: string;
}

export class Command {
	public readonly name: string = '';
	public readonly execute: Function = () => {};
	public readonly description?: string;

	constructor(configuration: CommandConfiguration) {
		this.name = configuration.name;
		this.description = configuration.description;
		this.execute = configuration.execute;
	}

}