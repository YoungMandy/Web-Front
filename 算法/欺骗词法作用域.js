/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.lan
 */
function foo (str)
{
  setTimeout(str, 0);
}
var b = 2;
foo('var b = 3;console.log("b",b,"|","a",a);console.log(arguments)');

const foo = new Function('a,b', 'return a + b');
console.log(foo(2, 3));

setTimeout(str, 0);


