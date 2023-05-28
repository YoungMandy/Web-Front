// js 中reduce的作用就是对数组里的每天元素调用一个回调函数

// 1.reduce 拉平嵌套数组
const flat = (list, res = []) => {
  list.reduce((accumulator, currentValue) => {
    if (Array.isArray(currentValue)) {
      flat(currentValue, res);
    } else {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, res);

  return res;
}

console.log(
  flat([
    [1, 2],
    [3, 4],
    [5, 6],
    [9,[5,[4],6]]
  ])
);

// 2.reduce计算数组中每个元素出现的次数
const fruit = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruit.reduce((accumulator, currentValue)=> {
  accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
  return accumulator;
}, {})
console.log(count);

// 3. reduce 按年龄条件分组
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 25 },
  { name: 'Emily', age: 30 },
];

const groupedPeople = people.reduce(
  (accumulator, currentValue) => {
    const key = currentValue.age;
    if (!accumulator[key]){
      accumulator[key] = [];
    }
    accumulator[key].push(currentValue);
    return accumulator;
  },
  {}
);
console.log(groupedPeople);

// 4. reduce 将多个数字合并为一个对象
const keys = ['name', 'age', 'gender'];
const values = ['Alice', 25, 'female'];
const peopleObj = keys.reduce((accumulator, currentValue, index) => {
  accumulator[currentValue] = values[index];
  return accumulator;
}, {});
console.log(peopleObj);

// 5.reduce 将字符串转变成对象
const str = 'key1=value1&key2=value2&key3=value3';
const obj = str.split('&').reduce((accumulator, current) => {
  const [key, value] = current.split("=");
  accumulator[key] = value;
  return accumulator;
}, {})
console.log(obj);

// 6.reduce 将对象转变成查询字符串
const params = { foo: 'bar', baz: 42 };
const queryString = Object.entries(params).reduce((accumulator, [key, value],index,array) => {
  accumulator +=
    index == array.length - 1 ? `${key}=${value}` : `${key}=${value}&`;
  return accumulator;
}, '?');
console.log(queryString);

// 7.reduce 打印菲波那切数列
// 构造函数Array(...) 不要求必须带new 关键字。不带时，它会被自动补上
const fibonacci = n => {
  return [...Array(n)].reduce((accumulator,currentValue,index) => {
    if (index < 2) {
      accumulator.push(index)
    } else {
      accumulator.push(accumulator[index - 1] + accumulator[index - 2])
    }
    return accumulator;
  },[])
}
console.log(fibonacci(10))

// 8.reduce 检查是否回文字符串
const str1 = 'racecar';
const isPalindrome = str1.split("").reduce((accumulator,currentValue,index,array) => {
  return accumulator && currentValue == array[array.length - index - 1];
}, true)
console.log(isPalindrome)

// 9.reduce 检查括号是否匹配
const str2 = ')()()(()';
const balanced = str2.split('').reduce((stack, currentValue) => {
  if (currentValue === '(') {
    stack.push(currentValue)
  } else if (currentValue === ')') {
    stack.pop();
  }
  return stack;
}, []).length == 0
console.log(balanced);

// 10.reduce 递归获取对象属性
const user = {
  info: {
    name: 'Jason',
    address: { home: 'Shaanxi', company: 'Xian' },
  },
};
function get (config, path, defaultValue) {
  const res = path.split(".").reduce((config, name) => config[name], config) || defaultValue;
  console.log(res);
  return res;
}

get(user, "info.name"); // Jason
get(user, "info.address.home"); // Shaanxi
get(user, "info.address.company"); // Xian
get(user, "info.address.abc", "default"); // default

// 手写reduce
function reduce1 (arr, callback, initialValue) {
  let accumulator = initialValue === undefined ? arr[0] : initialValue;
  for (let i = initialValue === undefined ? 1 : 0; i < arr.length; i++) { 
    accumulator = callback(accumulator, arr[i], i, arr);
  }
  return accumulator;
}
