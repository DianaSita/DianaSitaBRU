"use strict"

function arrayDiff(a, b) {
    if(a instanceof Array && b instanceof Array) {
        let result = [];
        for(let i = 0; i < a.length; i++) {
            if(!b.includes(a[i])) {
                result.push(a[i]);
            }
        }
        return result;
    }
    return null;
}
