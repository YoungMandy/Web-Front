function patchKeyedChildren(n1, n2, container) {
  const newChildren = n2.children;
  const oldChildren = n1.children;

  // 处理相同的前置节点
  let j = 0;

  let oldVNode = oldChildren[j];
  let newVNode = newChildren[j];

  while (oldVNode.key == newVNode.key) {
    patch(oldVNode, newVNode, container);
    j++;

    oldVNode = oldChildren[j];
    newVNode = newChildren[j];
  }

  // 更新相同的后置节点
  let oldEnd = oldChildren[oldChildren.length] - 1;
  let newEnd = newChildren[newChildren.length] - 1;

  oldVNode = oldChildren[oldEnd];
  newVNode = newChildren[newEnd];

  while (oldVNode.key == newVNode.key) {
    //调用patch函数进行更新
    patch(oldVNode, newVNode, container);

    // 递减oldEnd 和 nextEnd
    oldEnd--;
    newEnd--;

    oldVNode = oldChildren[oldEnd];
    newVNode = newChildren[newEnd];
  }

  // 新增节点的情况
  // 预处理完毕，如果满足以下条件，说明j到newEnd之间的节点应该作为新节点插入
  if (j > oldEnd && j <= newEnd) {
    const anchorIndex = newEnd + 1;

    const anchor =
      anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor);
    }
  } else if (j > newEnd && j <= oldEnd) {
    // 删除节点的情况oldEnd >= j
    while (j <= oldEnd) {
      unmount(oldChildren[j++]);
    }
  } else {
    // 预处理之后还需要移动中间的元素的情况
    const count = newEnd - j + 1;
    const source = new Array(count).fill(-1); // 用来存储新的一组子节点在旧一组子节点中的位置索引，后面会用它来计算出一个最长的递增子序列，并用于辅助完成DOM移动的操作

    const oldStart = j;
    const newStart = j;

    // 时间复杂度太高,不能这么写
    // // 遍历旧的一组子节点
    // for (let i = oldStart; i <= oldEnd; i++){
    //   const oldVNode = oldChildren[i];

    //   // 遍历新的一组节点
    //   for (let k = newStart; k <= newEnd; k++){
    //     const newVNode = newChildren[i];

    //     if (oldVNode.key == newVNode.key) {
    //       // 调用patch进行更新
    //       patch(oldVNode, newVNode, container);

    //       // 最后填充source数组
    //       source[k - newStart] = i;
    //     }
    //   }
    // }

    // 新增两个变量，moved 和 pos
    let moved = false; // 节点是否需要移动
    let pos = 0; // 最大索引值

    const keyIndex = {}; // key:VNode.key, value: 节点在newVNode中的索引
    for (let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i;
    }

    let patched = 0; // 更新过的节点数量
    for (let i = oldStart; i <= oldEnd; i++) {
      oldVNode = oldChildren[i];

      if (patched <= count) {
        const k = keyIndex[oldVNode.key];

        if (typeof k !== 'undefined') {
          newVNode = newChildren[k];
          patch(oldVNode, newVNode, container);

          patched++;

          // 填充source数组
          source[k - newStart] = i;

          if (k < pos) {
            moved = true; // 有一个元素需要移动就是需要移动
          } else {
            pos = k;
          }
        } else {
          // 旧节点不存在新数组中
          unmount(oldVNode);
        }
      } else {
        // 更新过的节点值大于需要更新的节点值，卸载多余的节点
        unmount(oldVNode);
      }
    }

    if (moved) {
      // 计算最长递增子序列，子序列在更新前后顺序没有变化
      const seq = getSequence(source);// 返回的是索引值

      // s指向最长递增子序列的最后一个元素
      let s = seq.length - 1;
      let i = count - 1;

      for (i; i >= 0; i--){
        if (source[i] == -1) {// 在旧数组中不存在，需要挂载
          const pos = i + newStart;

          const newVNode = newChildren[pos];
          const nextPos = pos + 1;

          // 锚点
          const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;
          patch(null, newVNode, container, anchor);
          
        }
        if (i != seg[s]) {
          // 索引值不在最长递增子序列里，需要移动

          const pos = i + newStart;
          const newVNode = newChildren[pos];

          // 该节点的一个节点的位置索引
          const nextPos = pos + 1;
          // 
          const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null;

          // 移动节点是通过insert函数实现的
          insert(newVNode, container, anchor);

        } else {
          s--;
        }
      }
    }
  }
}

// oldEnd < j 说明在预处理过程中，所有旧节点都被处理完了
// newEnd >= j ,在预处理过程中,在新的一组子节点中，依然有未被处理的节点，而这些遗留的节点被视为新节点

// 获取最长递增子序列
function getSequence (arr) {
  const p = arr.slice();
  const result = [0];// 返回的是索引

  let i, j, u, v, c;
  const len = arr.length;

  for (let i = 0; i < len; i++){ // 遍历数组
    const arrI = arr[i];

    if (arrI !== 0) {
      j = result[result.length - 1];

      if (arr[j] < arrI) { // 当前元素的值大于最小递增序列的最后一个值
        p[i] = j;// ?
        result.push(i);
        continue;

      }

      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = ((u + v) / 2) | 0;

        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }

      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
    
  }

  u = result.length;
  v = result[u - 1];

  while (u-- > 0) {
    result[u] = v;
    v = p[v]
  }

  return result;
}

