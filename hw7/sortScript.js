"use strict"

function quickSort(array) {
    if(array.length <= 1) {
        return array;
    }
    let pivot = array[Math.floor(array.length / 2)];
    const rightPart = [];
    const leftPart = [];
    for(let i = 1; i < array.length; i++) {
        if(pivot > array[i]) {
            leftPart.push(array[i]);
        } else {
            rightPart.push(array[i]);
        }
    }
    return quickSort(leftPart).concat(pivot, quickSort(rightPart));
}

let arr = quickSort([6, 7, 3, 4, 3, 7, 4, 2, 0, 8, 4]);
console.log(arr);
