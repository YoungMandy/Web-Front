function valueInObject (obj, s) {
  if (typeof obj !== 'object' || obj == null) return false;// 非对象

  let res = false;
  const memo = new Map();

  function dfs (node, value) {

    if (node == null) return;
    if (res == true) return;

    if (typeof node == 'object' && node !== null) {
      // for(let key in node){
      //     dfs(node[key],value)
      // }
      if (memo.has(node)) {

        return;
      } else {
        memo.set(node, value);
        const keys = Object.keys(node);
        const len = keys.length;

        for (let i = 0; i < len && !res; i++) {
          const key = keys[i];
          dfs(node[key], value)
        }
      }
     

    } else {
      if (node == value) {
        res = true;
      }
    }
  }

  dfs(obj, s);
  return res;
}

const b = {
  sub: {
    params: [0, 1, 2, 3, 6],
  }
}

let o = {
  sub: {
    params: [0, 1, 2, 3, 'alpha1', 6, b],
    other: {
      text: 123,
      d: [5, 6, b],
      g: [0, 8, b],
      'c':'alpha'
    },
  }
}

console.log(valueInObject(o, 'alpha'))