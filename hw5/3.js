"use strict"

Function.prototype.apply = function (context, params, ...args) {
    context.func = this;
    return context.func(params, ...args);
}

function getPerson (name, age, func) {
    return {name: name, age: age, func: func};
}

function displayName(word) {
    console.log(this.name);
    console.log(this.func);
    console.log(word);
}

function sayHello() {
    console.log("Hello");
}

let person = getPerson("Person1", 20, sayHello);

displayName.apply(person, "apply");
