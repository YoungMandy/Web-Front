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