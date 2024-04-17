"use strict";
const key = Symbol();
const symbolHasInstance = Symbol.hasInstance;
const s0 = Symbol();
const s1 = Symbol.for('foo');
const s2 = Symbol.hasInstance;
const s3 = s0;
class myArray {
    static [Symbol.hasInstance](value) {
        return true;
    }
}
const g = new myArray();
console.log(g instanceof myArray);
