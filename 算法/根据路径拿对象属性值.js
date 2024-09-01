// 1.eval
// const obj = {
//   selector: { to: { toutiao: 'FE coder' } },
//   target: [1, 2, { name: 'byted' }]
// };

// // 根据路径拿对象属性值

// const getValueByPath = (obj, ...rest) => {

//   const result = rest.map(item => {

//     return eval(`obj.${item}`);
//   });
//   console.log(result);// [ 'FE coder', 1, 'byted' ]
//   return result;
// }

// getValueByPath(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')

// 2.Function
// const obj = {
//   selector: { to: { toutiao: 'FE coder' } },
//   target: [1, 2, { name: 'byted' }]
// };

// // 根据路径拿对象属性值

// const getValueByPath = (param1, ...rest) => {
//   const obj = JSON.stringify(param1);

//   const result = rest.map(item => {

//     return new Function(`return ${obj}.${item}`)();
//   });
//   console.log(result);//[ 'FE coder', 1, 'byted' ]
//   return result;
// }

// getValueByPath(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')


// 3.递归
const obj = {
  selector: { to: { toutiao: 'FE coder' } },
  target: [1, 2, { name: 'byted' }]
};

// 根据路径拿对象属性值

const getValueByPath = (obj, ...rest) => {

  function convertString (str) {
    // 使用正则表达式匹配形如 [数字] 的子串
    return str.replace(/\[(\d+)\]/g, '.$1');
  }
  const result = rest.map(item => {

    const pathList = convertString(item).split('.');
    
    let parent = obj;

    while (pathList.length) {
      let path = pathList.shift();
      parent = parent[path]

    }

  return parent;
  });
  console.log(result);//[ 'FE coder', 1, 'byted' ]
  return result;
}

getValueByPath(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')

