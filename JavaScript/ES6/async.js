async function asyncTest () {
  let a = 1;
  debugger;
  const b = await Promise.resolve(113);
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