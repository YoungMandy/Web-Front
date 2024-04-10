function father() {
  let a = 'apple';
  let b = 'pear';
  return function son () {
    debugger
    console.log(a);
    console.log(b);
  }
}

const fn = father(); 
fn();
