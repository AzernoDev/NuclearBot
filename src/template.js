class Command {

    #name
    #method
    #description;

    constructor(name, method, description) {
        this.#name = name;
        this.#method = method;
        this.#description = description;
    }

    get GetName() {
        return this.#name;
    }

    get Method() {
        this.#method();
    }

    get Describe() {
        return this.#description;
    }
}