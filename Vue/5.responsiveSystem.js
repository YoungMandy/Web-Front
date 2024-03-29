// // // ### 第一版:对象属性支持响应式
// // // // 存储副作用函数的桶
// // // const bucket = new Set();

// // // // 原始数据
// // // const data = { text: 'hello world' };

// // // // 对原始数据的代理
// // // const obj = new Proxy(data, {
// // //   // 拦截读取操作
// // //   get(target, key) {
// // //     // 将副作用函数effect添加到桶里
// // //     bucket.add(effect);

// // //     // 返回属性值
// // //     return target[key];
// // //   },
// // //   // 设置拦截操作
// // //   set(target, key, newVal) {
// // //     // 设置属性值
// // //     target[key] = newVal;

// // //     // 把副作用函数从桶里取出并执行
// // //     bucket.forEach(fn => fn());

// // //     // 返回true代表设置成功
// // //     return true;
// // //   },
// // // });

// // // // 副作用函数
// // // function effect () {
// // //   document.body.innerText = obj.text ? obj.text:'没有';
// // // }

// // // // 执行副作用函数，触发读取
// // // effect();

// // // // 1秒后修改响应式数据
// // // setTimeout(() => {
// // //   obj.text = "hello vue3";
// // // }, 1000);


// // // ### 第二版 支持任意的effect 函数名
// // // 存储副作用函数的桶
// // // const bucket = new Set();
// // // const data = { text: 'hello world' };
// // // // 用一个全局变量存储被注册的副作用函数
// // // let activeEffect;
// // // // effect 函数用于注册副作用函数

// // // function effect(fn){
// // //   // 当调用effect注册副作用函数时，将副作用那个函数注册给activeEffect
// // //   activeEffect = fn;

// // //   // 执行副作用函数
// // //   fn();
// // // }


// // // const obj = new Proxy(data, {
// // //   get(target, key) {
// // //     // 将activeEffect 中存储的副作用函数收集到"桶"中
// // //     if (activeEffect) {
// // //       // 新增
// // //       bucket.add(activeEffect); // 新增
// // //     }

// // //     return target[key];
// // //   },
// // //   set(target, key, newVal) {
// // //     target[key] = newVal;
// // //     bucket.forEach((fn) => fn());

// // //     return true;
// // //   },
// // // });

// // // effect(
// // //   // 一个匿名的副作用函数
// // //   () => {
// // //     console.log('effect run'); // 会打印两次
// // //     document.body.innerText = obj.text;
// // //   }
// // // );

// // // setTimeout(() => {
// // //   // 副作用函数并没有读取noExist属性的值
// // //   obj.notExist = "hello vue3";
// // // }, 1000);


// // // 第三版 属性值和关联的副作用函数建立一一对应关系
// // // const bucket = new  WeakMap();
// // // const data = { ok: true, text: 'hello world' };
// // // // 用一个全局变量存储被注册的副作用函数
// // // let activeEffect;
// // // // effect 函数用于注册副作用函数

// // // function effect(fn) {
// // //   // 当调用effect注册副作用函数时，将副作用那个函数注册给activeEffect
// // //   activeEffect = fn;
// // //   // 执行副作用函数
// // //   fn();
// // // }

// // // const obj = new Proxy(data, {
// // //   // 拦截读取操作
// // //   get(target, key) {
// // //     // 将副作用函数activeEffect 添加到存储副作用函数的桶中
// // //     track(target, key);

// // //     return target[key];
// // //   },

// // //   // 拦截设置操作
// // //   set(target, key, newVal) {
// // //     // 设置属性值
// // //     target[key] = newVal;
// // //     //把副作用函数从桶里取出并执行
// // //     trigger(target, key);
// // //   },
// // // });

// // // // 在get 拦截函数内调用 track 函数追踪变化
// // // function track(target, key) {
// // //   // 没有activeEffect, 直接return
// // //   if (!activeEffect) return;

// // //   let depsMap = bucket.get(target);

// // //   if (!depsMap) {
// // //     bucket.set(target, (depsMap = new Map()));
// // //   }

// // //   let deps = depsMap.get(key);
// // //   if (!deps) {
// // //     depsMap.set(key, (deps = new Set()));
// // //   }

// // //   deps.add(activeEffect);
// // // }

// // // // 在 set 拦截函数内调用trigger 函数触发变化
// // // function trigger(target, key) {
// // //   const depsMap = bucket.get(target);
// // //   if (!depsMap) return;

// // //   const effects = depsMap.get(key);
// // //   effects && effects.forEach((fn) => { console.log('副作用函数执行啦');fn() });
// // // }

// // // effect(function effectFn () {
// // //   document.body.innerText = obj.ok ? obj.text : 'not';
// // // })

// // // 当前版本存在的问题： 当对象的属性改变不会影响到页面时，effect函数依然执行
// // // 解决方案： 在effect函数也收集依赖，在副作用函数执行前先清除依赖

// // // #### 第四版： 副作用函数执行前先清空副作用函数，避免副作用函数进行没有意义的执行
// // const bucket = new WeakMap();
// // let activeEffect;

// // const data = { ok: true, text: 'hello world' };
// // const obj = new Proxy(data, {
// //   get (target, key) {
// //     track(target, key);

// //     return target[key];
// //   },

// //   set (target, key, value) { 
// //     trigger(target, key);
// //     target[key] = value;
// //   }
// // })

// // function track (target, key) { 
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
// //   // 新增
// //   activeEffect.deps.push(deps);
// // }

// // function trigger (target, key) {
// //   if (!activeEffect) return;

// //   const depsMap = bucket.get(target);
// //   if (!depsMap) return;

// //   const effects = depsMap.get(key);

// //   if (effects) {
// //     const effectsToRun = new Set(effects);

// //     effectsToRun.forEach((fn) => {
// //       console.log('副作用函数执行啦');
// //       fn();
// //     });
// //   }
    
// // }

// // function effect (fn) {
  
// //   const effectFn = () => {
// //     activeEffect = effectFn;
// //     cleanup(effectFn);
// //     fn();
// //   }
// //   effectFn.deps = [];
// //   effectFn();
// // }

// // function cleanup(effectFn) {
// //   // 遍历 effectFn.deps 数组
// //   for (let i = 0; i < effectFn.deps.length; i++) {
// //     // deps是依赖集合
// //     const deps = effectFn.deps[i];

// //     // 将effectFn 从依赖集合中移除
// //     deps.delete(effectFn);
// //   }

// //   // 最后需要重置effectFn.deps数组
// //   effectFn.deps.length = 0;
// // }

// // effect(function effectFn () {
// //   document.body.innerText = obj.ok ? obj.text : 'not';
// // })

// // // 标记分隔处


// // const bucket = new WeakMap();
// // let activeEffect;

// // const data = { ok: true, text: 'hello world',foo:true, bar:true };
// // const obj = new Proxy(data, {
// //   get (target, key) {
    
// //     track(target, key);
// //     return target[key];
// //   },
// //   set (target, key, value) { 
// //     trigger(target, key);
// //     target[key] = value;
// //   }
// // })

// // function track (target, key) { 
// //   // 如果没有函数用到这个对象，是不用收集对象的依赖的
// //   if (!activeEffect) return;
// //   let depsMap = bucket.get(target);

// //   if (!depsMap) {
// //     bucket.set(target,(depsMap = new Map()));
// //   }

// //   let deps = depsMap.get(key);
// //   if (!deps) {
// //     depsMap.set(key,(deps = new Set()));
// //   }

// //   deps.add(activeEffect);// 收集属性关联到的函数
  

// //   // 从函数角度，收集关联的属性(的影响的函数的集合) 
// //   activeEffect.deps.push(deps);
// // }


// // // 在重新赋值后，依赖的副作用函数要重新执行
// // function trigger (target, key) {
// //   // 拿到对象收集的依赖集
// //   const depsMap = bucket.get(target);
  
  
// //   if (!depsMap) return;

// //   // 拿到指定属性的依赖集，即副作用函数的集合
// //   const effects = depsMap.get(key);

// //   if (!effects) return;

// //   // 因为会在副作用函数执行前清空，在调用forEach遍历Set集合时，如果一个值已经被访问过了，但该值被删除并重新添加到集合，如果此时forEach循环没有结束，那么该值会重新访问
// //   const effectRun = new Set(effects);
  
// //   effectRun.forEach(fn => fn());
// // }


// // function effect (fn) {
// //   const effectFn = () => {
    
// //     cleanup(effectFn);// 在执行副作用函数前，先把其与一些属性的关联去除
// //     activeEffect = effectFn; 
// //     fn();
// //   }
// //   effectFn.deps = [];// 从函数角度，收集其依赖的属性
// //   effectFn();
// // }

// // function cleanup (effectFn) {
// //   // effectFn.deps 是二维数组,内容是一个Set
// //   for (let i = 0; i < effectFn.deps.length; i++){
// //     const deps = effectFn.deps[i];// deps 是从属性角度，收集了依赖这个属性的函数的Set
// //     deps.delete(effectFn);
// //   }
// //   effectFn.deps.length = 0;// 从函数角度，将函数依赖的属性集清空
// // }

// // // effect(function effectFn () {
// // //   document.body.innerText = obj.ok ? obj.text : 'not';
// // // })


// // let temp1, temp2;
// // effect(function effectFn1 () {
// //   console.log('effectFn1 执行');

// //   effect(function effectFn2 () { 
// //     console.log('effectFn2 执行');
// //     temp2 = obj.bar;
// //   })

// //   temp1 = obj.foo;
// // })

// // 当前版本的问题：activeEffect所存储的副作用函数只能有一个，当副作用函数发生嵌套时，内层的副作用那个函数会覆盖activeEffect 的值，并且永远不会恢复到原来的值

// // 第五版本：建立effect栈,解决副作用函数嵌套问题

// // let activeEffect;
// // const effectStack = [];
// // const bucket = new WeakMap();

// // const data = { foo: true, bar: true, num:0 };

// // const obj = new Proxy(data, {
// //   get (target, key) {
// //     track(target,key);// 收集要读取对象key的副作用函数
// //     return target[key];
// //   },
// //   set (target, key, value) {
// //     target[key] = value;
// //     trigger(target,key);// 因为数据改变了，重新执行副作用函数
// //   }
// // })

// // // 收集读取该对象属性值的函数
// // function track (target,key) {
// //   if (!activeEffect) return;// 如果副作用函数没有执行(activeEffect为undefined)，就没有必要收集是哪些函数依赖这个属性

// //   let depsMap = bucket.get(target);// 看这个对象是否已经在桶里面了

// //   // 这个对象还没有在桶里存过，给它加入一下
// //   if (!depsMap) {
// //     bucket.set(target, (depsMap = new Map()));
// //   }

// //   // 看看当前key的依赖项是否已经有个Set在记录了
// //   let deps = depsMap.get(key);
// //   if (!deps) {
// //     // 没有的话 new 一个Set来记录依赖当前属性的副作用函数
// //     depsMap.set(key,(deps = new Set()));
// //   }

// //   // 将当前激活当然副作用函数记录到 key 的被依赖收集Set里面
// //   deps.add(activeEffect);
// //   // 从函数角度，记录当前依赖key的函数
// //   activeEffect.deps.push(deps);
// // }

// // // 属性值被重新设置，改变了，副作用函数要重新执行一下
// // function trigger (target, key) {
// //   const depsMap = bucket.get(target);
// //   if (!depsMap) return;// 桶里没有收集过这个对象的数据，不需要重新执行副作用函数，您请回吧

// //   const effects = depsMap.get(key); // 这里拿到的是一个Set结构
  
// //   const effectsToRun = [];
// //   effects &&
// //     effects.forEach((fn) => {
// //       effectsToRun.push(fn);
// //     });

// //   effectsToRun.forEach(effectFn => effectFn());
// // }


// // // 提供注册副作用函数的方法
// // function effect (fn) {
// //   // 对传进来的方法进行二次封装，添加我们的逻辑
// //   const effectFn = () => {
// //     effectStack.push(effectFn); // 当前执行函数入栈

// //     cleanup(effectFn); // 在执行副作用函数前，先把其与一些属性的关联去除
// //     activeEffect = effectFn;
// //     fn();

// //     // 执行完毕，顶层函数出栈
// //     effectStack.pop();

// //     // activeEffect 指向调用栈的下一个元素
// //     activeEffect = effectStack[effectStack.length - 1];
// //   }

// //   effectFn.deps = [];
// //   effectFn();
// // }

// // function cleanup (effectFn) {
// //   for (let i = 0; i < effectFn.deps.length; i++) { 
// //     const depsSet = effectFn.deps[i];
// //     depsSet.delete(effectFn);// 主要是防止内存泄露
// //   }
// //   effectFn.deps.length = 0;
// // }
// // 调用effect注册函数

// // let temp1, temp2;
// // effect(function effectFn1 () {
// //   console.log('effectFn1 执行');

// //   effect(function effectFn2 () { 
// //     console.log('effectFn2 执行');
// //     temp2 = obj.bar;
// //     document.body.innerText = obj.bar;
// //   })

// //   temp1 = obj.foo;
// // })
// // obj.bar = false;
// // effect(() => obj.num++)
// // 当前版本存在的问题: 类似effect(() => obj.num++) 这样既设置又读取的操作会导致调用栈溢出
// // 原因： 首先读取obj.num 的值，这会触发track 操作，将当前副作用函数收集到桶中，接着将其加1后赋值给obj.num,此时会触发trigger操作，即把桶里的副作用函数取出并执行。但问题是该副作用函数正在执行中，还没有执行完毕，就要开始下一次的执行。这样会导致无限递归地调用自己，于是就产生了栈溢出。

// // 分析这个问题可以看出，读取和设置操作是在同一个副作用函数内进行的，此时无论是track 时收集的副作用函数还是trigger时要触发执行的副作用函数，都是activeEffect。基于此，我们可以在trigger动作发生时增加守卫条件：如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。

// // 第六版: 解决无限递归调用自己导致调用栈溢出的问题

// // const bucket = new WeakMap();
// // const effectStack = [];
// // const data = { num: 0 };
// // let activeEffect = undefined;
// // const obj = new Proxy(data, {
// //   get (target, key) {
// //     // 建立依据对象，对象属性 的副作用函数网
// //     track(target, key);
// //     return target[key];
// //   },
// //   set (target, key, value) { 
// //     trigger(target, key);// 数据改变了，依赖的函数要重新执行一遍
// //     target[key] = value;
// //   }
// // })

// // // 收集依赖属性的副作用函数
// // function track(target, key) {
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

// //   // 需要从副作用函数的角度删除依赖
// //   activeEffect.deps.push(deps);
// // }

// // // 在数据改变之后,触发副作用函数的重新执行
// // function trigger (target, key) {
// //   const depsMap = bucket.get(target);
// //   if (!depsMap) return;

// //   const effects = depsMap.get(key);

// //   const effectsToRun = new Set();
// //   effects && effects.forEach(fn => {
// //     if (fn !== activeEffect) {
// //       effectsToRun.add(fn);
// //     }
// //   });

// //   effectsToRun.forEach(effectFn => effectFn());
// // }

// // // 注册副作用函数
// // function effect (fn) {
  
// //   const effectFn = () => {
// //     cleanup(effectFn);

// //     activeEffect = effectFn;

// //     effectStack.push(activeEffect);

// //     fn();

// //     effectStack.pop();
// //     activeEffect = effectStack[effectStack.length - 1];
// //   }

// //   effectFn.deps = [];
// //   effectFn();
// // }

// // // 先清除一下副作用函数，读取对象值的时候重新收集回来
// // function cleanup(effectFn){
// //   for (let i = 0; i < effectFn.deps.length; i++){
// //     const effectSet = effectFn.deps[i];
// //     effectSet.delete(effectFn);
// //   }
// //   effectFn.deps.length = 0;
// // }

// // effect(() => obj.num++);

// // 当前版本存在的问题: 不能调度执行的顺序
// // 解决方案: effect的注册函数支持传递一个option对象，传递一个函数进来控制顺序，需要在trigger函数里面做一点小改动

// // 第七版：支持配置调度顺序
// // const bucket = new WeakMap();
// // let activeEffect;
// // const effectStack = [];

// // const data = { num: 0, foo: 0, bar: 0 };

// // const obj = new Proxy(data, {
// //   get (target, key) {
// //     // 收集依赖这些属性的函数
// //     track(target, key);
// //     return target[key];
// //   },
// //   set (target, key, value) { 
// //     target[key] = value;
// //     // 触发副作用函数的重新执行
// //     trigger(target, key);
// //   }
// // })

// // // 收集依赖该对象属性的副作用函数
// // function track (target, key) { 
// //   if (!activeEffect) return;

// //   let depsMap = bucket.get(target);

// //   if (!depsMap) {
// //     bucket.set(target, (depsMap = new Map()));
// //   }

// //   let deps = depsMap.get(key);
// //   if (!deps) {
// //     depsMap.set(key, (deps = new Set()));
// //   }

// //   deps.add(activeEffect)
// //   activeEffect.deps.push(deps);
// // }

// // // 数据改变触发副作用函数的重新执行
// // function trigger (target, key) { 
// //   const depsMap = bucket.get(target);
// //   if (!depsMap) return;

// //   effects = depsMap.get(key);

// //   const effectsToRun = new Set();

// //   effects && effects.forEach(effect => {
// //     if (effect !== activeEffect) {
// //       effectsToRun.add(effect);
// //     }
// //   });

// //   effectsToRun.forEach(effectFn => {
// //     if (effectFn.options.scheduler) {
// //       effectFn.options.scheduler(effectFn);
// //     } else {
// //       effectFn();
// //     }
// //   })
// // }

// // function cleanup (effectFn) {
// //   for (let i = 0; i < effectFn.deps.length; i++) { 
// //     const effectSet = effectFn.deps[i];
// //     effectSet.delete(effectFn);
// //   }
// //   effectFn.deps.length = 0;
// // }

// // function effect (fn, options = {}) {
// //   const effectFn = () => {
// //     cleanup(effectFn);
// //     activeEffect = effectFn;

// //     effectStack.push(effectFn);
// //     fn();
// //     effectStack.pop();
// //     activeEffect = effectStack[effectStack.length - 1];
// //   }

// //   effectFn.deps = [];
// //   effectFn.options = options;
// //   effectFn();
// // }

// // // effect(() => {
// // //   console.log(obj.num);
// // // }, {
// // //   scheduler (fn) {
// // //     setTimeout(fn)
// // //   }
// // // })

// // // obj.num++;
// // // console.log("结束了");

// // // 定义一个任务队列
// // const jobQueue = new Set();

// // let flushing = false;
// // const p = Promise.resolve();

// // function flushJob () {
// //   if (flushing) return;
// //   flushing = true;
// //   p.then(() => {
// //     jobQueue.forEach(fn =>fn())
// //   }).finally(() => {
// //     flushing = false;
// //     jobQueue.clear();
// //   })
// // }
// // effect(() => {
// //   console.log(obj.num)
// // }, {
// //   scheduler (fn) {
// //     // 每次调度时，将副作用函数添加到jobQueue队列中
// //     jobQueue.add(fn);
// //     //调用flushJob刷新队列
// //     flushJob();
// //   }
// // })
// // obj.num++;

// // obj.num++;

// // 第八版:增加computed 和lazy
// // const bucket = new WeakMap();
// // let activeEffect;
// // const effectStack = [];// 类似于调用栈

// // const data = { num: 0, foo: 1, bar: 2 };
// // const obj = new Proxy(data, {
// //   get (target, key) {
// //     // 收集那些地方依赖了这些数据
// //     track(target, key);
// //     return target[key];
// //   },
// //   set (target, key, value) { 
// //     target[key] = value;
// //     // 触发副作用函数的重新执行
// //     trigger(target, key);
// //   }
// // })

// // function track (target, key) { 
// //   if (!activeEffect) return;//没有依赖的副作用函数，就不需要收集
// //   let depsMap = bucket.get(target);

// //   if (!depsMap) {
// //     bucket.set(target, (depsMap = new Map()));
// //   }

// //   let deps = depsMap.get(key);
// //   if (!deps) {
// //     depsMap.set(key, (deps = new Set()));
// //   }

// //   deps.add(activeEffect);

// //   activeEffect.deps.push(deps);
// // }

// // // 数据改变，触发副作用函数的重新执行
// // function trigger (target, key) {
// //   const depsMap = bucket.get(target);

// //   if (!depsMap) return;
// //   const effects = depsMap.get(key);

// //   const effectsToRun = new Set();

// //   effects && effects.forEach(effect => {
// //     if (effect !== activeEffect) {
// //       effectsToRun.add(effect);
// //     }
// //   })
// //   effectsToRun.forEach(effectFn => {
// //     if (effectFn?.options?.scheduler) {
// //       effectFn.options.scheduler(effectFn);
// //     } else {
// //       effectFn();
// //     }
// //   })
// // }

// // // 执行副作用函数前先清除副作用函数和数据之前关联。在执行副作用函数用到数据时会重新关联上
// // function cleanup (effectFn) {
// //   for (let i = 0; i < effectFn.deps.length; i++) { 
// //     const effectSet = effectFn.deps[i];
// //     effectSet.delete(effectFn);// 防止内存泄露
// //   }

// //   effectFn.deps.length = 0;
// // }


// // // 注册副作用函数
// // function effect (fn, options = {}) {
  
  
// //   const effectFn = () => {
// //     cleanup(effectFn);
// //     activeEffect = effectFn;

// //     effectStack.push(effectFn);
// //     const res = fn();

// //     effectStack.pop();
// //     activeEffect = effectStack[effectStack.length - 1];

// //     return res;
// //   }

// //   effectFn.options = options || {};
// //   effectFn.deps = [];

// //   if (!options?.lazy) {
// //     effectFn();
// //   }

// //   return effectFn;

// // }

function computed (getter) {
  let value;
  let dirty = true;// 数据脏的时候需要刷新
  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true;
        trigger(obj, 'value');
      }
    }
  });

  const obj = {
    get value () {
      if (dirty) { 
        value = effectFn();
        dirty = false;
      }
      track(obj, 'value');
      return value;
    }
  }

  return obj;
}


// // const sumRes = computed(() => obj.foo + obj.bar);
// // console.log(sumRes.value)
// // effect(() => {
// //   console.log("计算属性的改变", sumRes.value);
// // })

// // 第九版本: 实现watch
// // const bucket = new WeakMap();
// // let activeEffect;
// // const effectStack = []; // 类似于调用栈

// // const data = { num: 0, foo: 1, bar: 2 };

// // const obj = new Proxy(data, {
// //   get(target, key) {
// //     // 收集那些地方依赖了这些数据
// //     track(target, key);
// //     return target[key];
// //   },
// //   set(target, key, value) {
// //     target[key] = value;
// //     // 触发副作用函数的重新执行
// //     trigger(target, key);
// //   },
// // });

// // function track(target, key) {
// //   if (!activeEffect) return; //没有依赖的副作用函数，就不需要收集
// //   let depsMap = bucket.get(target);

// //   if (!depsMap) {
// //     bucket.set(target, (depsMap = new Map()));
// //   }

// //   let deps = depsMap.get(key);
// //   if (!deps) {
// //     depsMap.set(key, (deps = new Set()));
// //   }

// //   deps.add(activeEffect);

// //   activeEffect.deps.push(deps);
// // }

// // // 数据改变，触发副作用函数的重新执行
// // function trigger(target, key) {
// //   const depsMap = bucket.get(target);

// //   if (!depsMap) return;
// //   const effects = depsMap.get(key);

// //   const effectsToRun = new Set();

// //   effects &&
// //     effects.forEach((effect) => {
// //       if (effect !== activeEffect) {
// //         effectsToRun.add(effect);
// //       }
// //     });
// //   effectsToRun.forEach((effectFn) => {
// //     if (effectFn?.options?.scheduler) {
// //       effectFn.options.scheduler(effectFn);
// //     } else {
// //       effectFn();
// //     }
// //   });
// // }

// // // 执行副作用函数前先清除副作用函数和数据之前关联。在执行副作用函数用到数据时会重新关联上
// // function cleanup(effectFn) {
// //   for (let i = 0; i < effectFn.deps.length; i++) {
// //     const effectSet = effectFn.deps[i];
// //     effectSet.delete(effectFn); // 防止内存泄露
// //   }

// //   effectFn.deps.length = 0;
// // }

// // // 注册副作用函数
// // function effect(fn, options = {}) {
// //   const effectFn = () => {
// //     cleanup(effectFn);
// //     activeEffect = effectFn;

// //     effectStack.push(effectFn);
// //     const res = fn();

// //     effectStack.pop();
// //     activeEffect = effectStack[effectStack.length - 1];

// //     return res;
// //   };

// //   effectFn.options = options || {};
// //   effectFn.deps = [];

// //   if (!options?.lazy) {
// //     effectFn();
// //   }

// //   return effectFn;
// // }

// // function computed(getter) {
// //   let value;
// //   let dirty = true; // 数据脏的时候需要刷新
// //   const effectFn = effect(getter, {
// //     lazy: true,
// //     scheduler: () => {
// //       if (!dirty) {
// //         dirty = true;
// //         trigger(obj, 'value');
// //       }
// //     },
// //   });

// //   const obj = {
// //     get value() {
// //       if (dirty) {
// //         value = effectFn();
// //         dirty = false;
// //       }
// //       track(obj, 'value');
// //       return value;
// //     },
// //   };

// //   return obj;
// // }

// // const sumRes = computed(() => obj.foo + obj.bar);
// // console.log(sumRes.value);
// // effect(() => {
// //   console.log('计算属性的改变', sumRes.value);
// // });

// // // watch的本质: 观测一个响应式数据，当数据发生变化时通知
// // function watch (source, cb, options = {}) {
// //   let getter;

// //   // 如果source是函数，说明用户传递的事getter,所以直接把source赋值给getter
// //   if (typeof source === 'function') {
// //     getter = source;
// //   } else {
// //     getter = () => traverse(source);
// //   }
// //   let oldValue, newValue;
// //   // 使用effect注册副作用函数时，开启lazy选项，并把返回值存储到effectFn中方便后续调用

// //   // 提取scheduler调度函数为一个独立的job函数
// //   const job = () => {
// //     newValue = effectFn();
// //     cb(newValue, oldValue);
// //     oldValue = newValue;
// //   }

// //   const effectFn = effect(
// //     () => getter(),
// //     {
// //       lazy: true,
// //       scheduler: () => {
// //         // 在调度函数中判断flush是否为’post'，如果是,将其放到微任务列中执行
// //         if (options.flush === 'post') {
// //           const p = Promise.resolve();
// //           p.then(job);
// //         } else {
// //           job();
// //         }
// //       }
// //     }
// //   )

// //   if (options.immediate) {
// //     job();
// //   } else {
// //     oldValue = effectFn();
// //   }
 
// // }

// // watch(obj, () => {
// //   console.log("数据变化了");
// // })

// // function traverse (value, seen = new Set()) {
// //   // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
// //   if (typeof value !== 'object' || value === null || seen.has(value)) return;

// //   //将数据添加到seen中，代表遍历地读取过了，避免循环引用引起的死循环
// //   seen.add(value);

// //   for (const k in value) {
// //     traverse(value[k], seen);
// //   }
// //   return value;
// // }

// // 实现computed
// // function computed (getter) {
// //   let value;
// //   let dirty = true;
// //   const effectFn = effect(
// //     getter,
// //     {
// //       lazy: true,
// //       scheduler () {
// //         if (!dirty) {
// //           dirty = true;
// //         }
// //         trigger(obj, 'value');
// //       }
// //     }
// //   );

// //   const obj = {
// //     get value () {
// //       if (dirty) {
// //         value = effectFn();
// //         dirty = false;
        
// //       }
// //       track(obj, 'value');
// //       return value;
// //     }
// //   }

// //   return obj;
// // }

// // // const test = computed(() => obj.foo + obj.bar);

// // // const watchComputed = effect(() => console.log('我在监听计算属性的变化:', test.value));

// // // watch 的定义
// // function watch (source, cb, options = {}) {
// //   debugger

// //   let newValue, oldValue;
// //   let getter;
// //   if (typeof source === 'function') {
// //     getter = source;
// //   } else {
// //     getter = () => traverse(source);
// //   }

// //   let cleanup;
// //   function onInvalidate (fn) {
// //     debugger
// //     // 将过期回调函数存储到cleanup中
// //     cleanup = fn;
// //   }

// //   const job = () => {
// //     debugger
// //     newValue = effectFn();
// //     debugger
// //     if (cleanup) {
// //       debugger
// //       cleanup();
// //     }
// //     cb(newValue, oldValue, onInvalidate); // 作用域链找到了外面定义的onInvalidate,并把cleanup变量的值赋值为onInvalidate传递进来的函数
// //     oldValue = newValue;
// //   }

// //   const effectFn = effect(
// //     () => getter(),
// //     {
// //     lazy:true,
// //       scheduler: () => {
// //         if (options.flush === 'post') {
// //           const p = Promise.resolve();// 同步的
// //           debugger
// //           p.then(job);// 异步的
// //         } else {
// //           debugger
// //           job();
// //         }
// //       }
// //     })
  
// //   if (options.immediate) {
// //     // 当immediate为true立即执行job,从而触发回调执行
// //     job();
// //   } else {
// //     oldValue = effectFn();
// //   }

// // }

// // function traverse (value, seen = new Set()) {
// //   if (typeof value !== 'object' || value === null || seen.has(value)) return;
  
// //   seen.add(value);
// //   // if (Array.isArray(value)) {
// //   //   for (let v of value) {
// //   //     traverse(v, seen);
// //   //   }
// //   // } else {
// //     for (let k in value) {
// //       traverse(value[k], seen);
// //     }
// //   // }
// //   return value;
// // }
// // // 调用watch
// // watch(obj, async (newValue, oldValue, onInvalidate) => {
// //   debugger
// //   let expired = false;
// //   let finalData;



// //   onInvalidate(() => {
// //     debugger
// //     expired = true
// //   });

// //   const res = await Promise.resolve().then(setTimeout(()=> console.log('setTimeout执行'),4000));
  
// //   console.log('expired', expired);
// //   debugger
// //   if (!expired) {
   
// //     finalData = res;
// //   }
// // })



// // Promise.resolve().then(() => {
// //   console.log('第三次变动');
// //   obj.foo++;
// //   debugger;
// // });

// // 副作用函数指的是会产生副作用的函数
// // function effect () {
// //   document.body.innerText = obj.text;
// // }

// // 用一个全局变量存储被注册的副作用函数
// let activeEffect;
// // effect 函数用于注册副作用函数
// function effect (fn) {
//   activeEffect = fn;
//   fn();
// }


// // 当effect函数执行时，它会设置body的文本内容。也就是说，effect函数的执行会直接或间接影响其他函数的执行，这时我们说effect函数产生了副作用。

// const bucket = new WeakMap();
// const data = { text: 'hello world' };

// const obj = new Proxy(data, {
//   // 拦截读取操作
//   get (target, key) {
//     if (!activeEffect) return;
//     const depsMap = bucket.get(target);
//     if (!depsMap) {
//       bucket.set(target,(depsMap = new Map()))
//     }

//     let deps = depsMap.get(key);
//     if (!deps) {
//       depsMap.set(key,(deps = new Set()))
//     }

//     deps.add(activeEffect)
    
//     return target[key];
//   },
//   // 设置拦截操作
//   set (target, key, value) {
//     // 设置属性值
//     target[key] = value;
//     const depsMap = bucket.get(target);

//     if (!depsMap) return;

//     const effects = depsMap.get(key);

//     effects && effects.forEach(fn => fn());

//     return true; // 表示操作成功
//   }
// })

// effect(() => {
//   console.log('副作用函数执行');
//   document.body.innerText = obj.text;
// });

// setTimeout(() => {
//   obj.text = '123'
// }, 4000)

// setTimeout(() => {
//   obj.notExist = 'hello vue3'
// })

// // 当前的副作用函数的名字是固定的，不支持动态配置，所以我们需要提供一个注册副作用函数的机制


const bucket = new WeakMap();
let activeEffect;
const effectStack = [];

const data = {
  text: 'hello world',
  ok: true,
  num:0
}
// 追踪有哪些副作用函数调用了这个属性值
function track (target,key) {
   if (!activeEffect) return;
   let depsMap = bucket.get(target);
   if (!depsMap) {
     bucket.set(target, (depsMap = new Map()));
   }
   let deps = depsMap.get(key);
   if (!deps) {
     depsMap.set(key, (deps = new Set()));
   }
  deps.add(activeEffect);
  activeEffect.deps.push(deps)
}

// trigger 遍历目标对象的属性，把依赖该属性的副作用函数都执行了
function trigger (target, key) {

  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);

  const newSet = new Set(deps);

  newSet && newSet.forEach(fn => {
    if (activeEffect !== fn) {
      fn();
   }
 });
}

const obj = new Proxy(
  data, {
    get (target, key) {
      track(target,key)
      return target[key];
    },

    set (target, key, value) {
      target[key] = value;
      trigger(target, key);
    }
  }
)

function installEffect (fn,options) {
  const effectFn = () => {
    cleanup(effectFn);
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  }
  effectFn.deps = []; // 收集这个函数都依赖了哪些属性
  effectFn.options = options;
  effectFn(); 

}

function cleanup (effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++){
    const deps = effectFn.deps[i];
    deps.delete(effectFn);// 从对象的key存储的set中删除掉这个函数
  }

  effectFn.deps.length = 0;
}

installEffect(() => {
  debugger
  console.log(obj.num);
  // document.body.innerText = obj.ok ? obj.text : 'not';
}, {
  scheduler (fn) {
    setTimeout(fn)
  }
});

obj.num++;
obj.num++;
// console.log('结束了')

// setTimeout(() => {
//   obj.text = 'hello 123'
// }, 1000)

// setTimeout(() => {
//   obj.noExist = 'hello 不存在的属性';
//   obj.ok = false;
// }, 2000);

// setTimeout(() => {
//   obj.text = 'hello 不存在的属性';
// }, 3000);















