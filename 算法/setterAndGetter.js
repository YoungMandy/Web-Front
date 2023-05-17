// var myObject = {
//   get a ()
//   {
//     return this._a_;
//   },

//   set a (val)
//   {
//     this._a_ = val * 4;
//   }
// }

// myObject.a = 2;

// console.log(myObject.a)

// var myObject = {
//   a:'hl'
// }
// console.log("a" in myObject); // true
// console.log("b" in myObject); // false
// // in 操作符会检查属性是否在对象及其原型链中

// // hasOwnProperty 只会检查属性是否在myObject对象中，不会检查原型链

// var b = Object.create(myObject);

// console.log("a" in b); // true

// console.log("b.prototype," ,b.Prototype)


// var myObject = {};

// Object.defineProperty(myObject, "a", { enumerable: true ,value : 2});
// Object.defineProperty(myObject, "b", { enumerable: false, value :3});

// console.log("myObject.b:", myObject.b); // 3
// console.log("b in myObject:", "b" in myObject); // true
// console.log('myObject.hasOwnProperty(b):', myObject.hasOwnProperty("b")); //true

// for (let k in myObject)
// {
//   console.log(k, myObject[k]);// a 2
// }

// 可枚举相当于可以出现在对象属性的遍历中
// console.log(myObject.propertyIsEnumerable("a")); // true
// console.log(myObject.propertyIsEnumerable("b")); // false
// console.log(myObject.propertyIsEnumerable("c")); // false

//propertyIsEnumerable()会检查给定的属性名是否直接存在于对象中(而不是在原型链上)，并满足enumerable:true

// console.log(Object.keys(myObject)); // [ 'a' ]
// console.log(Object.getOwnPropertyNames(myObject));// [ 'a', 'b' ] 

//Object.keys 和getOwnPropertyNames 都会直接查找对象直接包含的属性

// 遍历对象的属性的顺序是不确定的
// 遍历对象的属性的顺序是不确定的，在不同的js引擎中可能不一样。一定不要相信任何观察到的顺序，他们是不可靠的

// var myArray = [1, 2, 3];
// var it = myArray[Symbol.iterator](); //iterator本身并不是一个迭代器对象，而是一个返回迭代对象的函数

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());


// 可以给任何想遍历的对象定义iterator

var myObject = {
  a: 2,
  b: 3,
  [Symbol.iterator]: function()
  {
    var o = this;
    var index = 0;
    var keyArr = Object.keys(o);
    return {
      next: function()
      {
        return {
          value: o[keyArr[index++]],
          done: index > keyArr.length
        }
      }
    }
  }
}

// Object.defineProperty(myObject, Symbol.iterator, {
//   enumerable: false,
//   writable: false,
//   configurable: true,
//   value: function()
//   {
//     var o = this;
//     var index = 0;
//     var keyArr = Object.keys(o);
//     return {
//       next: function()
//       {
//         return {
//           value: o[keyArr[index++]],
//           done:index > keyArr.length
//         }
//       }
//     }
//   }
// })

var it = myObject[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log('\n for of 循环输出的是属性值');
for (let v of myObject)
{
  console.log(v)
}


console.log('\n for in 循环输出的是属性');
for (let key in myObject)
{
  console.log(key)
}


console.log(Object.keys(myObject))


//只要迭代器的next()调用会返回{value:..} 和{done:...}，ES6的for ..of循环就可以遍历它

// for in 循环可以用来遍历对象的可枚举属性列表







