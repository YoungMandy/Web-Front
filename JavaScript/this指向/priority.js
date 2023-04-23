function foo () {
  console.log(this.myName);
}

const obj1 = {
  myName: "obj1",
  foo:foo
}

const obj2 = {
  myName: "obj2",
  foo: foo
}

obj1.foo(); // obj1
obj2.foo(); // obj2

obj1.foo.call(obj2); // obj2
obj2.foo.call(obj1); // obj1

// 由上可得,call绑定的优先级大于对象调用
