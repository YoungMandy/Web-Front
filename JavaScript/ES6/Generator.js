function* helloWorldGenerator () {
  yield 'hello';
  yield 'world';
  return 'ending';
}
let hw = helloWorldGenerator();

console.log(hw.next());
console.log(hw.next());
console.log(hw.next());