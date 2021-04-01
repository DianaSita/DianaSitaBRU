"use strict"

function multiplyAll(array) {
    return function(integer) {
        let result = [];
        array.forEach(element => {
            result.push(element * integer);
        });
        return result;
    };
}
