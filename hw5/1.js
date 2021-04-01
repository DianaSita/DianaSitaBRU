"use strict"

const multiplyTwo = (n) => n * 2;
const minusFour = (n) => n - 4;

const pipe = (func1, func2) => (arg) => func2(func1(arg));

const res = pipe(multiplyTwo, minusFour)(10);
console.log(res);
