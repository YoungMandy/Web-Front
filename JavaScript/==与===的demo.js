// let c = { text: 123 };
Object.prototype.toString = function() {
  return 123;
}
Object.prototype.valueOf = function() {
  return 456;
}

Date.prototype.toString = function() {
  return 123;
}
Date.prototype.valueOf = function() {
  return 456;
}
// c.valueOf();
// c.toString();

let a = new Date('2024-01-01');
console.log(a.toString());
console.log(a.valueOf());
console.log(a == 123);
console.log(a == 456);
debugger



Object.prototype.toString = function() {
  return 'toString';
}
Object.prototype.valueOf = function() {
  return 'valueof';
}
var myObject = {
  name: "myObject",
};

console.log('me ' + myObject + ' say'); // me valueof say
console.log(1 + myObject); //1valueof