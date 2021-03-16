"use strict"

function mapLettersToNumber(str) {
    let res = "0";
    if(typeof(str) === "string" && str.length > 0) {
        str = str.toLowerCase();
        let uniqueStr = "";
        for(let i = 0; i < str.length; ++i) {
            if(uniqueStr.indexOf(str[i]) === -1) {
                uniqueStr += str[i];
            }
        }
        for(let i = 1; i < str.length; ++i) {
            res += "." + uniqueStr.indexOf(str[i]);
        }
    }
    return res;
}
