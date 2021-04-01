"use strict"

const sum = (a, b) => a + b;

const memo = (func) => {
    let cache = {};
    return(...params) => {
        if(params in cache) {
            console.log("Cache");
            return cache[params];
        } else {
            console.log("Calculating");
            let res = func(params[0], params[1]);
            cache[params] = res;
            return res;
        }
    }
}

const memedSum = memo(sum);
console.log(memedSum(1, 2));
console.log(memedSum(1, 2));
