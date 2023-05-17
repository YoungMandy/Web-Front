const map = new Map();
const weakMap = new WeakMap();

(function() {
  const foo = { foo: 1 };
  const bar = { bar: 2 };
  
  map.set(foo, 1);
  weakMap.set(bar, 2);
})()

// 当该函数表达式执行完毕之后，对于对象foo来说，它仍然作为map的key被引用着，因此垃圾回收器不会把它从内存中移除，我们仍然可以通过map.keys打印出对象foo。 对于对象bar来说，由于WeakMap的key是弱引用，它不影响垃圾回收器的工作，所以一旦表达式执行完毕，垃圾回收器就会把对象bar从内存中移除，并且我们无法获取weakmap的key值，也就无法通过weakmap取得对象bar.

// WeakMap 对key是弱引用，不影响垃圾回收器的工作。