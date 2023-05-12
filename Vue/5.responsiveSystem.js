// // ### 第一版:对象属性支持响应式
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

// 第五版本：建立effect栈,解决副作用函数嵌套问题

// let activeEffect;
// const effectStack = [];
// const bucket = new WeakMap();

// const data = { foo: true, bar: true, num:0 };

// const obj = new Proxy(data, {
//   get (target, key) {
//     track(target,key);// 收集要读取对象key的副作用函数
//     return target[key];
//   },
//   set (target, key, value) {
//     target[key] = value;
//     trigger(target,key);// 因为数据改变了，重新执行副作用函数
//   }
// })

// // 收集读取该对象属性值的函数
// function track (target,key) {
//   if (!activeEffect) return;// 如果副作用函数没有执行(activeEffect为undefined)，就没有必要收集是哪些函数依赖这个属性

//   let depsMap = bucket.get(target);// 看这个对象是否已经在桶里面了

//   // 这个对象还没有在桶里存过，给它加入一下
//   if (!depsMap) {
//     bucket.set(target, (depsMap = new Map()));
//   }

//   // 看看当前key的依赖项是否已经有个Set在记录了
//   let deps = depsMap.get(key);
//   if (!deps) {
//     // 没有的话 new 一个Set来记录依赖当前属性的副作用函数
//     depsMap.set(key,(deps = new Set()));
//   }

//   // 将当前激活当然副作用函数记录到 key 的被依赖收集Set里面
//   deps.add(activeEffect);
//   // 从函数角度，记录当前依赖key的函数
//   activeEffect.deps.push(deps);
// }

// // 属性值被重新设置，改变了，副作用函数要重新执行一下
// function trigger (target, key) {
//   const depsMap = bucket.get(target);
//   if (!depsMap) return;// 桶里没有收集过这个对象的数据，不需要重新执行副作用函数，您请回吧

//   const effects = depsMap.get(key); // 这里拿到的是一个Set结构
  
//   const effectsToRun = [];
//   effects &&
//     effects.forEach((fn) => {
//       effectsToRun.push(fn);
//     });

//   effectsToRun.forEach(effectFn => effectFn());
// }


// // 提供注册副作用函数的方法
// function effect (fn) {
//   // 对传进来的方法进行二次封装，添加我们的逻辑
//   const effectFn = () => {
//     effectStack.push(effectFn); // 当前执行函数入栈

//     cleanup(effectFn); // 在执行副作用函数前，先把其与一些属性的关联去除
//     activeEffect = effectFn;
//     fn();

//     // 执行完毕，顶层函数出栈
//     effectStack.pop();

//     // activeEffect 指向调用栈的下一个元素
//     activeEffect = effectStack[effectStack.length - 1];
//   }

//   effectFn.deps = [];
//   effectFn();
// }

// function cleanup (effectFn) {
//   for (let i = 0; i < effectFn.deps.length; i++) { 
//     const depsSet = effectFn.deps[i];
//     depsSet.delete(effectFn);// 主要是防止内存泄露
//   }
//   effectFn.deps.length = 0;
// }
// 调用effect注册函数

// let temp1, temp2;
// effect(function effectFn1 () {
//   console.log('effectFn1 执行');

//   effect(function effectFn2 () { 
//     console.log('effectFn2 执行');
//     temp2 = obj.bar;
//     document.body.innerText = obj.bar;
//   })

//   temp1 = obj.foo;
// })
// obj.bar = false;
// effect(() => obj.num++)
// 当前版本存在的问题: 类似effect(() => obj.num++) 这样既设置又读取的操作会导致调用栈溢出
// 原因： 首先读取obj.num 的值，这会触发track 操作，将当前副作用函数收集到桶中，接着将其加1后赋值给obj.num,此时会触发trigger操作，即把桶里的副作用函数取出并执行。但问题是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样会导致无限递归地调用自己，于是就产生了栈溢出。

// 分析这个问题可以看出，读取和设置操作是在同一个副作用函数内进行的，此时无论是track 时收集的副作用函数还是trigger时要触发执行的副作用函数，都是activeEffect。基于此，我们可以在trigger动作发生时增加守卫条件：如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。

// 第六版: 解决无限递归调用自己导致调用栈溢出的问题

// const bucket = new WeakMap();
// const effectStack = [];
// const data = { num: 0 };
// let activeEffect = undefined;
// const obj = new Proxy(data, {
//   get (target, key) {
//     // 建立依据对象，对象属性 的副作用函数网
//     track(target, key);
//     return target[key];
//   },
//   set (target, key, value) { 
//     trigger(target, key);// 数据改变了，依赖的函数要重新执行一遍
//     target[key] = value;
//   }
// })

// // 收集依赖属性的副作用函数
// function track(target, key) {
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

//   // 需要从副作用函数的角度删除依赖
//   activeEffect.deps.push(deps);
// }

// // 在数据改变之后,触发副作用函数的重新执行
// function trigger (target, key) {
//   const depsMap = bucket.get(target);
//   if (!depsMap) return;

//   const effects = depsMap.get(key);

//   const effectsToRun = new Set();
//   effects && effects.forEach(fn => {
//     if (fn !== activeEffect) {
//       effectsToRun.add(fn);
//     }
//   });

//   effectsToRun.forEach(effectFn => effectFn());
// }

// // 注册副作用函数
// function effect (fn) {
  
//   const effectFn = () => {
//     cleanup(effectFn);

//     activeEffect = effectFn;

//     effectStack.push(activeEffect);

//     fn();

//     effectStack.pop();
//     activeEffect = effectStack[effectStack.length - 1];
//   }

//   effectFn.deps = [];
//   effectFn();
// }

// // 先清除一下副作用函数，读取对象值的时候重新收集回来
// function cleanup(effectFn){
//   for (let i = 0; i < effectFn.deps.length; i++){
//     const effectSet = effectFn.deps[i];
//     effectSet.delete(effectFn);
//   }
//   effectFn.deps.length = 0;
// }

// effect(() => obj.num++);

// 当前版本存在的问题: 不能调度执行的顺序
// 解决方案: effect的注册函数支持传递一个option对象，传递一个函数进来控制顺序，需要在trigger函数里面做一点小改动

// 第七版：支持配置调度顺序
const bucket = new WeakMap();
let activeEffect;
const effectStack = [];

const data = { num: 0, foo: 0, bar: 0 };

const obj = new Proxy(data, {
  get (target, key) {
    // 收集依赖这些属性的函数
    track(target, key);
    return target[key];
  },
  set (target, key, value) { 
    target[key] = value;
    // 触发副作用函数的重新执行
    trigger(target, key);
  }
})

// 收集依赖该对象属性的副作用函数
function track (target, key) { 
  if (!activeEffect) return;

  let depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  deps.add(activeEffect)
  activeEffect.deps.push(deps);
}

// 数据改变触发副作用函数的重新执行
function trigger (target, key) { 
  const depsMap = bucket.get(target);
  if (!depsMap) return;

  effects = depsMap.get(key);

  const effectsToRun = new Set();

  effects && effects.forEach(effect => {
    if (effect !== activeEffect) {
      effectsToRun.add(effect);
    }
  });

  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  })
}

function cleanup (effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) { 
    const effectSet = effectFn.deps[i];
    effectSet.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

function effect (fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;

    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }

  effectFn.deps = [];
  effectFn.options = options;
  effectFn();
}

// effect(() => {
//   console.log(obj.num);
// }, {
//   scheduler (fn) {
//     setTimeout(fn)
//   }
// })

// obj.num++;
// console.log("结束了");

// 定义一个任务队列
const jobQueue = new Set();

// 使用Promise.resolve() 创建一个promise实例，我们用它把一个任务加到微任务队列里

const p = Promise.resolve();

// 一个标志代表是否正在刷新队列
let isFlushing = false;
function flushJob () {
  // 如果队列正在刷新，则什么都不做
  if (isFlushing) return;

  // 设置为true,代表正在刷新
  isFlushing = true;

  // 在微任务队列中刷新jobQueue队列
  p.then(() => {
    jobQueue.forEach(job => job());
  }).finally(() => {
    // 结束后重置isFlushing
    isFlushing = false;
  })
}
effect(() => {
  console.log(obj.num)
}, {
  scheduler (fn) {
    // 每次调度时，将副作用函数添加到jobQueue队列中
    jobQueue.add(fn);
    //调用flushJob刷新队列
    flushJob();
  }
})
obj.num++;
obj.num++;