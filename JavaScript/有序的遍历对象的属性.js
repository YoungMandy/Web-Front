// 对象属性值的遍历会先遍历number型的键值，再依据加入对象中的字符串类型的键值

const obj = {
  country: 'Wonderland',
  name: 'Alice',
  age: 25,
  1:'hsafkh'
};

// 获取对象的所有键，并按照键创建的顺序排列
const keys = Object.keys(obj);

// 使用 forEach 遍历键
keys.forEach((key) => {
  console.log(`${key}:${obj[key]}`);
});
console.log('\n')

// 或者使用 for 循环遍历键
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  console.log(`${key}:${obj[key]}`);
}
