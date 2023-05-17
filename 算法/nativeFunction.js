var a = new String("abc");

console.log(typeof a); // object
console.log(a instanceof String);// true
console.log(Object.prototype.toString.call(a)); // [object String]


const b = new Array([1, 2, 3]);
debugger

var i = 2;
Number.prototype.valueOf = function(){
  return i++;
}
var a = new Number(42);

if (a == 2 && a == 3)
{
  console.log('Yep,this happened')
}

