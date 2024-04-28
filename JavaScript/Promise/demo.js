const p = new Promise((resolve, reject) => {
  try {
    resolve('成功');
  } catch (error) {
    reject(error);
  }
});

p.then(
  res1=> {
    console.log('成功回调1', res1);
    return a(res1);
  }
).then(res2 => {
  return b(res2);
}).then(res3 => {
 return c(res3)
}).catch(err => {
  console.log('失败回调', err);
});



async function foo () {
  return 123;
}

const a = foo();
console.log(a);