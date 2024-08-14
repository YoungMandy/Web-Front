常用的原生函数有:
String();
Number();
Boolean();
Array();
Object();
Function();
RegExp();
Date();
Error();
Symbol();


比如
```js
const arr = [1,2,3];
```
如果没有修改Array.prototype,那么`Object.getPrototypeOf(arr)`就指向的`Object.prototype`,如果修改了`Array.prototype`,那么`Object.getPrototypeOf(arr)`就指向的`Array.prototype`.

```js
const arr = Array(1, 2, 3);
const arr1 = [1, 2, 3];
console.log(Object.getPrototypeOf(arr));// Object(0) []
console.log(Object.getPrototypeOf(arr1));// Object(0) []
console.log(Object.getPrototypeOf(arr1) == Array.prototype);// true
console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype); // true
```

