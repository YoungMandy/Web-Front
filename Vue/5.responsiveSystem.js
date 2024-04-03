// // // 1.第一版简单响应式的实现

// // // 存储副作用函数的桶
// // const bucket = new Set();

// // // 原始数据
// // const data = {
// //   text: 'hello world'
// // }

// // // 对原始数据的代理
// // const obj = new Proxy(data, {
// //   set (target, key, val) {
// //     target[key] = val;
// //     // 把副作用函数从桶里拿出来并执行
// //     bucket.forEach(fn => fn());
// //     return true;
// //   },
// //   get (target, key) {
// //     bucket.add(effect)
// //     return target[key];
// //   }
// // })

// // // 1.副作用函数
// // function effect () {
// //   document.body.innerText = obj.text;
// // }
// // // 执行副作用函数，触发读取
// // effect();

// // // 3秒后触发数据的更新
// // setTimeout(() => {
// //   obj.text = 'hello vue3';
// // }, 3000)
// // // 缺陷：1.副作用函数只能叫effect

// // 第二版
// // let activeEffect;
// // const bucket = new Set();

// // const data = {
// //   text: 'hello world'
// // }

// // const obj = new Proxy(data, {
// //   set(target, key, val) {
// //     target[key] = val;
// //     bucket.forEach(fn => fn());
// //     return true;
// //   },

// //   get (target, key) {
// //     if(activeEffect) {
// //       bucket.add(activeEffect);
// //     }

// //     return target[key];
// //   }
// // })

// // // 变成注册副作用函数的用途
// // function effect (fn) {
// //   activeEffect = fn;
// //   fn();
// // }

// // effect(() => {
// //   console.log('副作用函数执行了');
// //   document.body.innerText = obj.text;
// // })

// // setTimeout(() => {
// //   obj.noExist = 'hello vue3';
// // }, 3000)
// // // 缺陷：key和副作用函数没有实现精准的映射

// // 第三版
// let activeEffect;
// const bucket = new WeakMap();

// const data = {
//   text: 'hello world'
// }

// function effect (fn) {
//   activeEffect = fn;
//   fn();
// }

// function track (target, key) {
//    if (!activeEffect) return target[key];
//    // 根据target,从桶里取得depsMap,它也是Map类型：key-> effects<Set>
//    let depsMap = bucket.get(target);

//    if (!depsMap) {
//      bucket.set(target, (depsMap = new Map()));
//    }

//    let deps = depsMap.get(key);

//    if (!deps) {
//      depsMap.set(key, (deps = new Set()));
//    }
//    deps.add(activeEffect);

//    return target[key];
// }

// function trigger(target, key){
//    const depsMap = bucket.get(target);

//     if (!depsMap) return;

//     const deps = depsMap.get(key);

//     if (deps) {
//       deps.forEach(fn => fn());
//     }
// }

// const obj = new Proxy(data, {
//   get (target, key) {

//     track(target, key);
//     return target[key];
//   },
//   set (target, key, val) {
//     target[key] = val;
//     trigger(target, key);
//   },

// })

// effect(() => {
//   console.log('副作用函数执行了');
//   document.body.innerText = obj.text;
// })

// setTimeout(() => {
//   obj.noExist = 'hello vue3';
// }, 3000)
// // 缺陷: 不支持分支切换

// // 第四版:增加分支切换
// let activeEffect;
// const bucket = new WeakMap();

// const data = {
//   text: 'hello world',
//   ok: true,
//   text1: 1,
//   text2: 2,
// }

// function effect (fn) {
//   const effectFn = () => {
//     cleanup(effectFn);
//     activeEffect = effectFn;

//     fn()
//   }
//   effectFn.deps = [];
//   effectFn();
// }

// function track (target, key) {
//   if (!activeEffect) return target[key];
//   // 根据target,从桶里取得depsMap,它也是Map类型：key-> effects<Set>
//   let depsMap = bucket.get(target);

//   if (!depsMap) {
//     bucket.set(target, (depsMap = new Map()));
//   }

//   let deps = depsMap.get(key);

//   if (!deps) {
//     depsMap.set(key, (deps = new Set()));
//   }
//   deps.add(activeEffect);

//   activeEffect.deps.push(deps)
// }

// function trigger(target, key){
//    const depsMap = bucket.get(target);

//     if (!depsMap) return;

//   const deps = depsMap.get(key);
//   const effects = new Set(deps);

//     if (effects) {
//       effects.forEach((fn) => fn());
//     }
// }

// function cleanup(effectFn){
//   for (let i = 0; i < effectFn.deps.length; i++){
//     const deps = effectFn.deps[i];
//     deps.delete(effectFn);
//   }

//   effectFn.deps.length;
// }

// const obj = new Proxy(data, {
//   get (target, key) {

//     track(target, key);
//     return target[key];
//   },
//   set (target, key, val) {
//     target[key] = val;
//     trigger(target, key);
//   },

// })

// effect(() => {
//   console.log('副作用函数执行了');
//   document.body.innerText = obj.ok? obj.text1:obj.text2;
// })

// setTimeout(() => {
//   obj.ok = false;
// }, 3000)

// 缺陷：不支持嵌套

// // 第五版:增加调用栈
// let activeEffect;

// const effectStack = [];
// const bucket = new WeakMap();

// const data = {
//   text: 'hello world',
//   ok: true,
//   text1: 1,
//   text2: 2,
// }

// function effect (fn) {
//   const effectFn = () => {
//     cleanup(effectFn);
//     activeEffect = effectFn;
//     effectStack.push(effectFn);// 入栈

//     fn();//执行
//     effectStack.pop();//执行完毕出栈
//     activeEffect = effectStack[effectStack.length - 1];
//   }
//   effectFn.deps = [];
//   effectFn();
// }

// function track (target, key) {
//   if (!activeEffect) return target[key];
//   // 根据target,从桶里取得depsMap,它也是Map类型：key-> effects<Set>
//   let depsMap = bucket.get(target);

//   if (!depsMap) {
//     bucket.set(target, (depsMap = new Map()));
//   }

//   let deps = depsMap.get(key);

//   if (!deps) {
//     depsMap.set(key, (deps = new Set()));
//   }
//   deps.add(activeEffect);

//   activeEffect.deps.push(deps)
// }

// function trigger(target, key){
//    const depsMap = bucket.get(target);

//     if (!depsMap) return;

//   const deps = depsMap.get(key);
//   const effects = new Set(deps);

//     if (effects) {
//       effects.forEach((fn) => fn());
//     }
// }

// function cleanup(effectFn){
//   for (let i = 0; i < effectFn.deps.length; i++){
//     const deps = effectFn.deps[i];
//     deps.delete(effectFn);
//   }

//   effectFn.deps.length;
// }

// const obj = new Proxy(data, {
//   get (target, key) {

//     track(target, key);
//     return target[key];
//   },
//   set (target, key, val) {
//     target[key] = val;
//     trigger(target, key);
//   },

// })

// let temp1, temp2;
// effect(function effect1 () {
//   console.log('副作用函数1执行了');
//   effect(function effect2 () {
//     console.log('副作用函数2执行了');
//     temp2 = obj.text2
//   })
//   temp1 = obj.text1;
// })

// setTimeout(() => {
//   obj.text2 = 9;
// }, 3000)

// // 缺陷：如果obj.num++场景会导致栈溢出

// 第六版:避免递归死循环
// 第五版:增加调用栈
let activeEffect;

const effectStack = [];
const bucket = new WeakMap();

const data = {
  text: 'hello world',
  ok: true,
  text1: 1,
  text2: 2,
  num: 1,
  foo:1
};

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn); // 入栈

    fn(); //执行
    effectStack.pop(); //执行完毕出栈
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}

function track(target, key) {
  if (!activeEffect) return target[key];
  // 根据target,从桶里取得depsMap,它也是Map类型：key-> effects<Set>
  let depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);

  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);

  activeEffect.deps.push(deps);
}

function trigger(target, key) {
  const depsMap = bucket.get(target);

  if (!depsMap) return;

  const deps = depsMap.get(key);
  const effects = new Set(deps);

  if (effects) {
    effects.forEach((fn) => {
      if (fn !== activeEffect) {
        fn();
      }
    });
  }
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }

  effectFn.deps.length;
}

const obj = new Proxy(data, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    trigger(target, key);
  },
});

let temp1, temp2;
effect(function effect1 () {
  console.log('副作用函数1执行了');
 obj.num++;
});



// 缺陷：如果obj.num++场景会导致栈溢出
