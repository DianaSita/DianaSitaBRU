"use strict"

function calculateStringLength(str) {
    let array;
    if(typeof(str) === "string" && str.length > 0) {
        array = str.split(" ");
        for(let i = 0; i < array.length; ++i) {
            array[i] += " " + array[i].length;
        }
    }
    return array;
}
