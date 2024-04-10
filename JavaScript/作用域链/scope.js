function test() {
  let a = 'apple';
  {
    let b = 'pear';
    console.log('b:', b);
  }
  console.log('a:', a);
  console.log('b:', b);
}

test();
