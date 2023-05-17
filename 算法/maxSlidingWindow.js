
class MaxHeap {
  constructor(val = [],sortKey = 'val') {
    this.list = val;
    this.sortKey = sortKey;
  }

  getValue (arr,index)
  {
    const len = arr.length;
    if (len < 1 || index < 0 || index > len - 1) return undefined;

    if (typeof arr[0] === 'object' && arr[0] !== null)
    {
      return arr[index][this.sortKey]
    }

    return arr[index];
  }

  size() {
    return this.list.length;
  }

  push (val)
  {
    
    this.list.push(val);
    const len = this.size();
    this.shiftUp(this.list, len, len - 1);
  }

  peek() {
    if (!this.list.length) return null;
    return this.list[0];
  }

  remove ()
  {
    
    if (!this.list.length) return null;
    const removeItem = this.list[0]; // 堆顶元素师放到数组第一位的
    this.list[0] = this.list[this.list.length - 1];
    this.list.pop();
    const len = this.size();
    this.shiftDown(this.list, len, 0);
    return removeItem;
  }

  //往上调整，新加入堆的元素放到叶子节点，然后向上调整
  shiftUp(arr, size, i) {
    while (
      Math.floor((i - 1) / 2) < size &&
      this.getValue(arr,Math.floor((i - 1) / 2)) < this.getValue(arr,i)
    ) {
      this.swap(arr, i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
    }
  }

  // 向下调整，将栈顶元素删除后，将最底层的叶子节点放到栈顶，然后调整顺序
  shiftDown(arr, size, i) {
    let maxPosition = i;
    while (true) {
      if (2 * i + 1 < size && this.getValue(arr,2 * i + 1) > this.getValue(arr,maxPosition))
        maxPosition = 2 * i + 1;
      if (2 * i + 2 < size && this.getValue(arr,2 * i + 2) > this.getValue(arr,maxPosition))
        maxPosition = 2 * i + 2;

      if (maxPosition === i) {
        break;
      }

      this.swap(arr, i, maxPosition);

      i = maxPosition;
    }
  }

  swap(list, index1, index2) {
    [list[index1], list[index2]] = [list[index2], list[index1]];
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const window = new MaxHeap();
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    window.push({ val: nums[i], index: i });

    if (i >= k - 1) {
      while (window.peek()?.index <= i - k) // 栈顶元素的在原数组的下标已经不在滑动窗口范围则删除
      {
        
        window.remove();
      }
      res.push(window.peek()?.val);
    }
  }

  return res;
};

console.log(
  'maxSlidingWindow',
  maxSlidingWindow([1,  -1,], 1)
);
