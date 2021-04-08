"use strict"

function deepCopy(obj) {
    const copy = {};
    if (typeof obj === "object") {
        for (let key in obj) {
            if (!(obj[key] instanceof Array) && !(obj[key] instanceof Function) ) {
                if (!(obj[key] instanceof Object) ) {
                    copy[key] = obj[key];
                } else {
                    copy[key] = deepCopy(obj[key]);
                }
            }
        }
    }
    return copy;
}

const oldObj = {
    key1: 1,
    key2: "string",
    key3: () => ({key1: "key"}),
    key4: [],
    key5: 5,
    key6: {
        a: 4,
        b: 5,
        c: "key6_c",
        d: {key1: 1 },
    }
};

console.log(oldObj);
const newObj = deepCopy(oldObj);
console.log(newObj);

newObj.newKey = "newKey";
console.log(oldObj);