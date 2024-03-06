// n1是旧的虚拟节点
function pathChildren(n1, n2, container) {
  // n2是新的虚拟节点
  if (typeof n2.children == 'string') {
    // 省略代码
  } else if (Array.isArray(n2.children)) {
    const oldChildren = n1.children;
    const newChildren = n2.children;

    let lastIndex = 0; // 最大的索引值
    for (let i = 0; i < newChildren.length; i++) {
      const newVNode = newChildren[i];

      let j = 0;
      let find = false;// 表示找到对应的旧节点
      for (j; j < oldChildren.length; j++) {
        const oldVNode = oldChildren[j];
        if (newVNode.key == oldVNode.key) {
          find = true;
          // 找到可以复用的节点
          pathChildren(oldVNode, newVNode);// 更新节点内容
          
          if (j < lastIndex) { // 节点的索引值小于当前的最大索引值(在旧数组中的最大索引)，说明被移动到了后面
            // 先获取newVNode的前一个vnode,即prevNode
            const prevNode = newChildren[i - 1];
            // 如果prevNode不存在，则说明当前newVNode是第一个节点，它不需要移动
            if (prevNode) {
              // 由于我们要将newVNode对应的真实DOM移动到prevNode的后面，所以需要找到prevNode对应的真实DOM的下一个兄弟节点，并将其作为锚点

              const anchor = prevNode.el.nextSibling;

              // 调用insert方法将newVNode对应的真实DOM插入到锚点元素前面,也就是prevNode对应的真实DOM的后面
              insert(newVNode.el,container,anchor)

            }
          } else {
            lastIndex = j;
          }
          break;
        }
      }

      // 循环查找旧数组结束，没有在旧数组中找到对应的节点，也就是说是新增的节点，需要挂载

      if (!find) {
        const prevNode = newChildren[i - 1];
        let anchor = null;
        if (prevNode) {
          anchor = prevNode.el.nextSibling;
        } else {
          // 如果没有前一个vnode节点，说明即将挂载的是第一个子节点
          anchor = container.firstChild;
        }

        patch(null, newVNode, container, anchor);

      }
    }
  } else {
    //不是文本也不是数组的情况
  }
}

function insert (el, parent, anchor) {
  // 将DOM插入到anchor元素之前
  parent.insertBefore(el,anchor)
}

function patch (n1, n2, container, anchor) {
  if (typeof type == 'string') {
    if (!n1) { // 没有旧节点，说明是初始化挂载
      mountElement(n2, container, anchor);
    } else {
      patchElement(n1, n2);
    }
  } else if (type == 'text') {
    
  } else if (type == Fragment) {
    
  }
}

function mountElement (vnode, container, anchor) {
  insert(el,container,anchor);
}
