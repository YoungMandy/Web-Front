function foo() {
  var a = 1;
  var b = { name: '极客邦' ,num:1};
  function showName () {
    debugger
    var c = 2;
    var d = { name: '极客时间' };

    console.log('a', a);
    console.log('b', b);
  }
  b.showName = showName;
  return b;
}
const b = foo();
b.num++;
debugger
console.log('b7777',b);
b.showName();
