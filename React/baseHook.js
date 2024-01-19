function useState (value) {
  const getter = () => value;
  const setter = (newValue) => (value = newValue);
  return [getter, setter];
}

const [count, setCount] = useState(0);
console.log(count());
setCount(1);
console.log(count());


function useEffect (callback) {
  const execute = () => {
    // 重置依赖
    cleanup(effect);

    // 将当前的effect推入栈顶
    effectStack.push(effect);

    try {
      // 执行回调
      callback();
    } finally {
      // effect 出栈
      effectStack.pop();
    }

  }

  const effect = {
    execute,
    deps:new Set()
  }

  execute();
}

function cleanup (effect) {
  // 从该effect订阅的所有state对应subs中移除该effect

  for (const subs of effect.deps) {
    subs.delete(effect);
  }


  // 将该effect依赖的所有state对应subs移除
  effect.deps.clear();
}
