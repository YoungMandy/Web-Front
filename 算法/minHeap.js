class MinHeap {
  constructor(data = []) {
    this.list = data; // 用数组存储
  }

  size() {
    return this.list.length;
  }

  // 返回堆顶元素
  peek() {
    if (!this.size()) return null;
    return this.list[0];
  }

  swap (arr, index1, index2)
  {
    
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  }

  insert (data)
  {
    
    this.list.push(data); //新加入的元素放到最后位置;
    const i = this.list.length - 1;
    this.shiftUp(this.list, this.size(), i);
  }

  remove ()
  {
    const removeItem = this.list[0];
    this.list[0] = this.list[this.list.length - 1]; // 最后一个元素放堆顶位置
    this.list.pop();
    this.shiftDown(this.list, this.size(), 0); //从上到下调整堆

    return removeItem;
  }

  //向下调整堆，左节点:2*i+1，右节点 :2*1+2
  shiftDown(list, size, i) {
    let minPos = i;

    while (true) {
      if (2 * i + 1 < size && list[2 * i + 1] < list[i]) minPos = 2 * i + 1;
      if (2 * i + 2 < size && list[2 * i + 2] < list[minPos])
        minPos = 2 * i + 2;

      if (minPos === i) break; // 当前节点已经小于它的子节点，不需要再调整

      this.swap(list, i, minPos);

      i = minPos; // 已经交换的节点再和它的子节点做比较
    }
  }

  // 向上调整堆,迭代(找父节点 i-1/2，比较，交换)
  shiftUp(list, size, i) {
    // 父节点的值小于子节点，交换，
    while (
      Math.floor((i - 1) / 2) < size &&
      list[i] < list[Math.floor((i - 1) / 2)]
    ) {
      this.swap(list, i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2); // 往上继续
    }
  }
}

var KthLargest = function (k, nums) {
  this.k = k;
  this.data = nums;
  this.heap = new MinHeap();
  for (let i = 0; i < this.data.length; i++) {
    this.add(this.data[i]);
  }
};

KthLargest.prototype.add = function (val) {
  this.heap.insert(val); //加入堆
  if (this.heap.size() > this.k) {
    //大小超过了小顶堆的size，就从小顶堆删除一个最小的元素
    this.heap.remove(); //删除最小的元素
  }

  const res = this.heap.peek();

  console.log('res',res)

  return res; //返回堆顶
};


kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3);   // return 4
kthLargest.add(5);   // return 5
kthLargest.add(10);  // return 5
kthLargest.add(9);   // return 8
kthLargest.add(4);   // return 8