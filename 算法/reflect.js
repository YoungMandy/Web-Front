// 存储副作用函数的痛
const bucket = new WeakMap();

const obj = new Proxy(data, {
  //拦截读取操作
  get (target, key)
  {
    // 没有activeEffect,直接return
    if (!activeEffect) return target[key];

    //根据target,从桶中取得depsMap
    let depsMap = bucket.get(target);
    if (!depsMap)
    {
      bucket.set(target, (depsMap = new Map()));
    }

    //deps 存储着所有与当前key相关的副作用函数：effects
    let deps = depsMap.get(key);
    if (!deps)
    {
      depsMap.set(key, (deps = new Set(0)));
    }
    // 将当前激活测副作用函数添加到桶里
    deps.add(activeEffect);

    return target[key];
  },

  //设置拦截操作
  set (target, key, newVal)
  {
    target[key] = newVal;

    const depsMap = bucket.get(target);

    if (!depsMap) return;

    const effects = depsMap.get(key);

    effects && effects.forEach(fn => fn());
  }
})