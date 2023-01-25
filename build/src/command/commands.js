"use strict";
module.exports = class {
    constructor(name, description, method) {
        let self = this;
        self.name = name;
        self.description = description;
        self.method = method;
        self.type = '';
    }
    ;
    getSelf() {
        return self;
    }
};
