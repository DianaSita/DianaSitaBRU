"use strict"

function bracketDuplicates(str) {
    let res;
    if(typeof(str) === "string" && str.length > 0) {
        str = str.toLowerCase() + " ";
        res = str[0];
        counter = 1;
        for(let i = 1; i < str.length; ++i) {
            if(str[i-1] === str[i]) {
                counter++;
            } else {
                if(counter > 2) {
                    res += "]" + str[i];
                    counter = 1;
                    continue;
                }
                counter = 1;
            }
            if(counter === 3) {
                res += "["
            }
            res += str[i];
        }
    } else {
        res = "Please enter a valid string";
    }
    return res.trim();
}
