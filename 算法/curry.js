function add () {
  const args = [];

  function curried (...rest) {
    if (rest.length === 0) {
      return args.reduce((a, b) => a + b);
    } else {

      args.push(...rest);
      return curried;
    }
  }

  return curried(...Array.from(arguments));
}

console.log(add(1, 2)(3)(4, 5)());
console.log(add(5)());
console.log(add(1, 2)(3)());