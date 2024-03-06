function patchChildren(n1, n2, container) {
  if (typeof n2.children === 'string') {
    // 省略部分代码
  } else if (Array.isArray(n2.children)) {
    // 封装patchKeyedChildren函数处理两组子节点
    patchKeyedChildren(n1, n2, container);
  } else {
    // 省略部分代码
  }
}

function patchKeyedChildren(n1, n2, container) {
  const oldChildren = n1.children;
  const newChildren = n2.children;

  // 定义四个索引值
  let oldStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = newChildren.length - 1;

  // 四个索引指向vnode节点
  let oldStartVNode = oldChildren[oldStartIdx];
  let oldEndVNode = oldChildren[oldEndIdx];
  let newStartVNode = newChildren[newStartIdx];
  let newEndVNode = newChildren[newEndIdx];

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

    // 如果旧数组的首尾节点被处理过了，直接跳到下一个位置
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx]
      
    } else if (!oldEndVNode) {
      oldEndVNode = oldChildren[--oldEndIdx];

    }else if (oldStartVNode.key == newStartVNode.key) {
      // 第一步，oldStartVNode 和 newStartVNode比较（头部节点比较）
      patch(oldStartVNode, newStartVNode, container);
      oldStartVNode = oldChildren[++oldStartIdx];
      newStartVNode = newChildren[++newStartIdx];

    } else if (oldEndVNode.key == newEndVNode.key) {
      // 第二步,oldEndVNode 与newEndVNode比对（尾部节点比较）
      // 节点在新的顺序中依旧处于尾部，不需要移动，但是依旧需要打补丁

      patch(oldEndVNode, newEndVNode, container);
      // 更新尾部的节点和指针
      oldEndVNode = oldChildren[--oldEndIdx];
      newEndVNode = newChildren[--newEndIdx];

    } else if (oldStartVNode.key == newEndVNode.key) {
      // 第三步，oldStartVNode与newEndVNode对比
      patch(oldEndVNode, newEndVNode, container);

      // oldStartVNode 插入到oldEndVNode后面(也就是他的下一个兄弟节点的前面)
      insert(oldStartVNode.el, oldEndVNode.el.nextSibling, container);
      // 更新索引到下一个位置
      oldStartVNode = oldChildren[++oldStartIdx];
      newEndVNode = newChildren[--newEndIdx];

    } else if (oldEndVNode.key == newStartVNode.key) {
      // 依然要调用patch函数进行打补丁
      patch(oldEndVNode, newStartVNode, container);

      // 移动DOM操作
      //oldEndVNode.el 移动到 oldStartVNode.el前面
      insert(oldEndVNode.el, container, oldStartVNode.el);
      // 移动DOM完成后，更新索引值，并指向下一个位置
      oldEndVNode = oldChildren[--oldEndIdx];
      newStartVNode = newChildren[++newStartIdx];
    } else {
      // 四个首尾节点都没有匹配上
      // 拿新的一组子节点中的头部节点去旧的一组节点重查找

      const idxOnOld = oldChildren.findIndex(node => node.key == newStartVNode.key);

      if (idxOnOld > 0) { // 说明非头节点的元素变成了头节点
        const vnodeToMove = oldChildren[idxOnOld];
        patch(vnodeToMove, newStartVNode, container);

        insert(vnodeToMove.el, container, oldStartVNode.el);

        // 由于位置idxInOld处的节点对应真实的DOM已经移动到了别处，因此可以设置为undefined;
        oldChildren[idxOnOld] = undefined;
        // 更新newStartIdx到下一个位置
        newStartVNode = newChildren[++newStartIdx];
        
      } else { // 说明是新增的节点，当前在新数组中是newStartIdx
        patch(undefined,newStartVNode,container,oldStartVNode.el)
        newStartVNode = newChildren[++newStartIdx];
      }
  }
  }

  // 循环结束后检查索引值的情况
  if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
    // 说明有新的节点遗漏，需要挂载
    for (let i = newStartIdx; i <= newEndIdx; i++){
      patch(null, newChildren[i], container, oldEndVNode.el);
    }
    
  } else if (newEndIdx < newStartIdx && newStartIdx <= newEndIdx) {
    // 移除操作
    for (let i = oldStartIdx; i <= oldEndIdx; i++) { 
      unmount(oldChildren[i]);
    }
  }




function patch(n1, n2, container, anchor) {
  if (typeof type == 'string') {
    if (!n1) {
      // 没有旧节点，说明是初始化挂载
      mountElement(n2, container, anchor);
    } else {
      patchElement(n1, n2);
    }
  } else if (type == 'text') {
  } else if (type == Fragment) {
  }
}

function mountElement(vnode, container, anchor) {
  insert(el, container, anchor);
}