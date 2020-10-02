class CommandTemplate {

    name
    method
    description;

    constructor(name, method, description) {
        this.name = name;
        this.method = method;
        this.description = description;
    }
}

module.exports = CommandTemplate;