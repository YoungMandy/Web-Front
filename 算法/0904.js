/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
function add (a, b) {
  console.log('$')
  return Promise.resolve(a + b);
}

function sum (arr) {
  const n = arr.length;
  const list = [];


  for (let i = 0; i < n; i += 2) {
    const a = arr[i];
    const b = arr[i + 1] ? arr[i + 1] : 0;
    list.push(add(a, b));
  }

  return new Promise((resolve, reject) => {
    Promise.all(list).then((res) => {
      const sum = res.reduce((total, cur) => {
        return total + cur;
      }, 0);

      resolve(sum);
    });
  });
}

const arr = [1, 2, 3, 4];
sum(arr).then((res) => {
  console.log("结果", res);
});

const list = {0:0,1:1};
// for (let item of list) {
//   console.log('item', item);
// }
console.log('JSON化', JSON.stringify(list));
console.log('JSON化2', JSON.stringify({ 0: {} }));

console.log(Object.prototype.toString.call(list))


// 创建一个 DataTransfer 对象
const dataTransfer = new DataTransfer();

// 使用 DataTransfer 对象的 items 属性，它是一个 DataTransferItemList 对象
const dataTransferItemList = dataTransfer.items;

// 使用 Object.prototype.toString.call() 方法获取类型字符串
const typeString = Object.prototype.toString.call(dataTransferItemList);

console.log(typeString); // 应该输出：[object DataTransferItemList]

// 定义一个自定义构造函数
function MyCustomType () {
  // 自定义类型的逻辑...
}

// 在 MyCustomType 的原型上设置 Symbol.toStringTag 属性
// 这个属性定义了在调用 Object.prototype.toString() 时返回的字符串
MyCustomType.prototype[Symbol.toStringTag] = 'MyCustomType';

// 创建 MyCustomType 的实例
const myObj = new MyCustomType();

// 使用 Object.prototype.toString.call() 来获取类型字符串
const typeString = Object.prototype.toString.call(myObj);

console.log(typeString); // 输出: [object MyCustomType]