/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
var bar = {
  myName: "meituan1",
  printName: function() {
    console.log(myName, this.myName)
  }
}
function foo () {
  let myName = "meituan2"
  return bar.printName
}
var myName = "meituan3";
// let myName = "meituan3"
let _printName = foo()
_printName()
bar.printName()

// es5和es6的继承有什么区别 