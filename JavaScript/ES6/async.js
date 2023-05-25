// async 函数会返回一个Promise对象
// await 会交出控制权，等后面的异步操作完成后，再接着走下一条语句
let text = 'hello world';
async function asyncTest () {
  let a = 1;
  debugger;
  const b = await c();
  debugger
  console.log('b', b);

  debugger;
  a++;
  console.log('a',a);
  return b;
} 
const b = asyncTest();
debugger
console.log('hello world');
debugger;

b.then(res => {
  debugger;
  console.log('res',res);
})

function c (){
  text = 'c';
  console.log('text', text);
}