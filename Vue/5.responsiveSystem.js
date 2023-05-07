// // ### 第一版对象属性支持响应式
// // // 存储副作用函数的桶
// // const bucket = new Set();

// // // 原始数据
// // const data = { text: 'hello world' };

// // // 对原始数据的代理
// // const obj = new Proxy(data, {
// //   // 拦截读取操作
// //   get(target, key) {
// //     // 将副作用函数effect添加到桶里
// //     bucket.add(effect);

// //     // 返回属性值
// //     return target[key];
// //   },
// //   // 设置拦截操作
// //   set(target, key, newVal) {
// //     // 设置属性值
// //     target[key] = newVal;

// //     // 把副作用函数从桶里取出并执行
// //     bucket.forEach(fn => fn());

// //     // 返回true代表设置成功
// //     return true;
// //   },
// // });

// // // 副作用函数
// // function effect () {
// //   document.body.innerText = obj.text ? obj.text:'没有';
// // }

// // // 执行副作用函数，触发读取
// // effect();

// // // 1秒后修改响应式数据
// // setTimeout(() => {
// //   obj.text = "hello vue3";
// // }, 1000);


// // ### 第二版 支持任意的effect 函数名
// // 存储副作用函数的桶
// // const bucket = new Set();
// // const data = { text: 'hello world' };
// // // 用一个全局变量存储被注册的副作用函数
// // let activeEffect;
// // // effect 函数用于注册副作用函数

// // function effect(fn){
// //   // 当调用effect注册副作用函数时，将副作用那个函数注册给activeEffect
// //   activeEffect = fn;

// //   // 执行副作用函数
// //   fn();
// // }


// // const obj = new Proxy(data, {
// //   get(target, key) {
// //     // 将activeEffect 中存储的副作用函数收集到"桶"中
// //     if (activeEffect) {
// //       // 新增
// //       bucket.add(activeEffect); // 新增
// //     }

// //     return target[key];
// //   },
// //   set(target, key, newVal) {
// //     target[key] = newVal;
// //     bucket.forEach((fn) => fn());

// //     return true;
// //   },
// // });

// // effect(
// //   // 一个匿名的副作用函数
// //   () => {
// //     console.log('effect run'); // 会打印两次
// //     document.body.innerText = obj.text;
// //   }
// // );

// // setTimeout(() => {
// //   // 副作用函数并没有读取noExist属性的值
// //   obj.notExist = "hello vue3";
// // }, 1000);


// // 第三版 属性值和关联的副作用函数建立一一对应关系
// // const bucket = new  WeakMap();
// // const data = { ok: true, text: 'hello world' };
// // // 用一个全局变量存储被注册的副作用函数
// // let activeEffect;
// // // effect 函数用于注册副作用函数

// // function effect(fn) {
// //   // 当调用effect注册副作用函数时，将副作用那个函数注册给activeEffect
// //   activeEffect = fn;
// //   // 执行副作用函数
// //   fn();
// // }

// // const obj = new Proxy(data, {
// //   // 拦截读取操作
// //   get(target, key) {
// //     // 将副作用函数activeEffect 添加到存储副作用函数的桶中
// //     track(target, key);

// //     return target[key];
// //   },

// //   // 拦截设置操作
// //   set(target, key, newVal) {
// //     // 设置属性值
// //     target[key] = newVal;
// //     //把副作用函数从桶里取出并执行
// //     trigger(target, key);
// //   },
// // });

// // // 在get 拦截函数内调用 track 函数追踪变化
// // function track(target, key) {
// //   // 没有activeEffect, 直接return
// //   if (!activeEffect) return;

// //   let depsMap = bucket.get(target);

// //   if (!depsMap) {
// //     bucket.set(target, (depsMap = new Map()));
// //   }

// //   let deps = depsMap.get(key);
// //   if (!deps) {
// //     depsMap.set(key, (deps = new Set()));
// //   }

// //   deps.add(activeEffect);
// // }

// // // 在 set 拦截函数内调用trigger 函数触发变化
// // function trigger(target, key) {
// //   const depsMap = bucket.get(target);
// //   if (!depsMap) return;

// //   const effects = depsMap.get(key);
// //   effects && effects.forEach((fn) => { console.log('副作用函数执行啦');fn() });
// // }

// // effect(function effectFn () {
// //   document.body.innerText = obj.ok ? obj.text : 'not';
// // })

// // 当前版本存在的问题： 当对象的属性改变不会影响到页面时，effect函数依然执行
// // 解决方案： 在effect函数也收集依赖，在副作用函数执行前先清除依赖

// // #### 第四版： 副作用函数执行前先清空副作用函数，避免副作用函数进行没有意义的执行
// const bucket = new WeakMap();
// let activeEffect;

// const data = { ok: true, text: 'hello world' };
// const obj = new Proxy(data, {
//   get (target, key) {
//     track(target, key);

//     return target[key];
//   },

//   set (target, key, value) { 
//     trigger(target, key);
//     target[key] = value;
//   }
// })

// function track (target, key) { 
//   if (!activeEffect) return;
//   let depsMap = bucket.get(target);

//   if (!depsMap) {
//     bucket.set(target, (depsMap = new Map()));
//   }

//   let deps = depsMap.get(key);
//   if (!deps) {
//     depsMap.set(key, (deps = new Set()));
//   }
//   deps.add(activeEffect);
//   // 新增
//   activeEffect.deps.push(deps);
// }

// function trigger (target, key) {
//   if (!activeEffect) return;

//   const depsMap = bucket.get(target);
//   if (!depsMap) return;

//   const effects = depsMap.get(key);

//   if (effects) {
//     const effectsToRun = new Set(effects);

//     effectsToRun.forEach((fn) => {
//       console.log('副作用函数执行啦');
//       fn();
//     });
//   }
    
// }

// function effect (fn) {
  
//   const effectFn = () => {
//     activeEffect = effectFn;
//     cleanup(effectFn);
//     fn();
//   }
//   effectFn.deps = [];
//   effectFn();
// }

// function cleanup(effectFn) {
//   // 遍历 effectFn.deps 数组
//   for (let i = 0; i < effectFn.deps.length; i++) {
//     // deps是依赖集合
//     const deps = effectFn.deps[i];

//     // 将effectFn 从依赖集合中移除
//     deps.delete(effectFn);
//   }

//   // 最后需要重置effectFn.deps数组
//   effectFn.deps.length = 0;
// }

// effect(function effectFn () {
//   document.body.innerText = obj.ok ? obj.text : 'not';
// })

// // 标记分隔处


// const bucket = new WeakMap();
// let activeEffect;

// const data = { ok: true, text: 'hello world',foo:true, bar:true };
// const obj = new Proxy(data, {
//   get (target, key) {
    
//     track(target, key);
//     return target[key];
//   },
//   set (target, key, value) { 
//     trigger(target, key);
//     target[key] = value;
//   }
// })

// function track (target, key) { 
//   // 如果没有函数用到这个对象，是不用收集对象的依赖的
//   if (!activeEffect) return;
//   let depsMap = bucket.get(target);

//   if (!depsMap) {
//     bucket.set(target,(depsMap = new Map()));
//   }

//   let deps = depsMap.get(key);
//   if (!deps) {
//     depsMap.set(key,(deps = new Set()));
//   }

//   deps.add(activeEffect);// 收集属性关联到的函数
  

//   // 从函数角度，收集关联的属性(的影响的函数的集合) 
//   activeEffect.deps.push(deps);
// }


// // 在重新赋值后，依赖的副作用函数要重新执行
// function trigger (target, key) {
//   // 拿到对象收集的依赖集
//   const depsMap = bucket.get(target);
  
  
//   if (!depsMap) return;

//   // 拿到指定属性的依赖集，即副作用函数的集合
//   const effects = depsMap.get(key);

//   if (!effects) return;

//   // 因为会在副作用函数执行前清空，在调用forEach遍历Set集合时，如果一个值已经被访问过了，但该值被删除并重新添加到集合，如果此时forEach循环没有结束，那么该值会重新访问
//   const effectRun = new Set(effects);
  
//   effectRun.forEach(fn => fn());
// }


// function effect (fn) {
//   const effectFn = () => {
    
//     cleanup(effectFn);// 在执行副作用函数前，先把其与一些属性的关联去除
//     activeEffect = effectFn; 
//     fn();
//   }
//   effectFn.deps = [];// 从函数角度，收集其依赖的属性
//   effectFn();
// }

// function cleanup (effectFn) {
//   // effectFn.deps 是二维数组,内容是一个Set
//   for (let i = 0; i < effectFn.deps.length; i++){
//     const deps = effectFn.deps[i];// deps 是从属性角度，收集了依赖这个属性的函数的Set
//     deps.delete(effectFn);
//   }
//   effectFn.deps.length = 0;// 从函数角度，将函数依赖的属性集清空
// }

// // effect(function effectFn () {
// //   document.body.innerText = obj.ok ? obj.text : 'not';
// // })


// let temp1, temp2;
// effect(function effectFn1 () {
//   console.log('effectFn1 执行');

//   effect(function effectFn2 () { 
//     console.log('effectFn2 执行');
//     temp2 = obj.bar;
//   })

//   temp1 = obj.foo;
// })

// 当前版本的问题：activeEffect所存储的副作用函数只能有一个，当副作用函数发生嵌套时，内层的副作用那个函数会覆盖activeEffect 的值，并且永远不会恢复到原来的值

// 第五版本：建立effect栈

let activeEffect;
const effectStack = []; // 新增
const bucket = new WeakMap();

const data = { ok: true, text: 'hello world',foo:true, bar:true };
const obj = new Proxy(data, {
  get (target, key) {
    
    track(target, key);
    return target[key];
  },
  set (target, key, value) { 
    trigger(target, key);
    target[key] = value;
  }
})

function track (target, key) { 
  // 如果没有函数用到这个对象，是不用收集对象的依赖的
  if (!activeEffect) return;
  let depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target,(depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key,(deps = new Set()));
  }

  deps.add(activeEffect);// 收集属性关联到的函数
  

  // 从函数角度，收集关联的属性(的影响的函数的集合) 
  activeEffect.deps.push(deps);
}


// 在重新赋值后，依赖的副作用函数要重新执行
function trigger (target, key) {
  // 拿到对象收集的依赖集
  const depsMap = bucket.get(target);
  
  
  if (!depsMap) return;

  // 拿到指定属性的依赖集，即副作用函数的集合
  const effects = depsMap.get(key);

  if (!effects) return;

  // 因为会在副作用函数执行前清空，在调用forEach遍历Set集合时，如果一个值已经被访问过了，但该值被删除并重新添加到集合，如果此时forEach循环没有结束，那么该值会重新访问
  const effectRun = new Set(effects);
  
  effectRun.forEach(fn => fn());
}

function effect (fn) {
  const effectFn = () => {
    cleanup(effectFn);

    activeEffect = effectFn;

    effectStack.push(effectFn); // 新增
    fn();

    // 在当前副作用那函数执行完毕之后，将当前副作用函数弹出栈
    effectStack.pop(); // 新增
    activeEffect = effectStack[effectStack.length - 1]; // 新增
  }
  effectFn.deps = [];

  effectFn();
}

function cleanup (effectFn) {
  // effectFn.deps 是二维数组,内容是一个Set
  for (let i = 0; i < effectFn.deps.length; i++){
    const deps = effectFn.deps[i];// deps 是从属性角度，收集了依赖这个属性的函数的Set
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;// 从函数角度，将函数依赖的属性集清空
}


let temp1, temp2;
effect(function effectFn1 () {
  console.log('effectFn1 执行');

  effect(function effectFn2 () { 
    console.log('effectFn2 执行');
    temp2 = obj.bar;
  })

  temp1 = obj.foo;
})

// 当前版本的问题： 如obj.foo = obj.foo + 1这样的语句，既会读取又会设置
// 推理一下代码的执行过程: 首先读取obj.foo 的值，这会触发track操作，将当前副作用函数收集到桶中，接着将其加1后再赋值给obj.foo，此时会触发trigger操作，即把桶中的副作用函数取出并执行。但问题是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样就会导致无限递归地调用自己，于是产生了栈溢出

// 解决办法并不难。通过分析这个问题我们能够发现，读取和设置操作是在同一个副作用函数内进行的。此时无论是track时收集的副作用函数，还是trigger时要触发执行的副作用函数，都是activeEffect。基于此，我们可以在trigger动作发生时增加守卫条件:如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行，如下面代码所示

function trigger (target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;

  const effects = depsMap.get(key);

  const effectsToRun = new Set();

  effects && effects.forEach(effectFn => {
    // 如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn);
    }
  })
  effectsToRun.forEach(effectFn => effectFn());
}

// 这样我们就能避免无限递归执行，从而避免栈溢出



