class Heap {
  constructor(data = [],count = 0){
    this.arr = data;
    this.count = count;//堆中已经存储的个数
  }

  // 插入
  insert (data)
  {
  
    ++this.count;
    this.arr[this.count] = data;//插入数据先放最后一位

    let i = this.count;

    while (Math.floor(i / 2) > 0 && this.arr[i] < this.arr[Math.floor(i / 2)]) {
      // 字节点的值小于父节点的值，交换数据
      this.swap(this.arr, i, Math.floor(i / 2));
      i = Math.floor(i / 2); // 再和上一级的父节点做对比
    }
  }

  size ()
  {
    return this.count;
  }

  swap (arr, index1, index2)
  {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
  }

  remove ()
  {
    if (this.count === 0) return -1;//堆中没有元素
    this.arr[1] = this.arr[this.count];//最后一个元素放到堆顶
    this.arr.pop();
    this.count--;
    this.heapify(this.arr,this.count,1)
  }

  //查看堆顶元素
  peek ()
  {
    if (this.count === 0) return null;
    return this.arr[1];
  }

  // 堆化
  heapify (arr, n, i)
  {
    while (true)
    {
      let maxPos = i;

      // 比较左节点，如果左节点的值小于当前父节点，记录左节点的下标，等会交换
      if (i * 2 <= n && arr[i] > arr[i * 2]) maxPos = i * 2;
      if (i * 2 + 1 <= n && arr[maxPos] > arr[i * 2 + 1]) maxPos = i * 2 + 1;

      if (maxPos === i) break; // 不需要交换
      this.swap(arr, i, maxPos);

      i = maxPos;// 下一个子节点和它的子节点比较
    }
  }
}

var KthLargest = function (k, nums) {
  this.k = k;
  this.data = nums;
  this.heap = new Heap();
  for (let i = 0; i < this.data.length; i++)
  {
    this.add(this.data[i]);
  }
};

KthLargest.prototype.add = function(val)
{
 
  this.heap.insert(val); //加入堆
  if (this.heap.size() > this.k) {
    //大小超过了小顶堆的size，就从小顶堆删除一个最小的元素
    this.heap.remove(); //删除最小的元素
  }

  return this.heap.peek(); //返回堆顶
};


kthLargest = new KthLargest(2, [0]);
kthLargest.add(-1);   // return 4
kthLargest.add(1);   // return 5
kthLargest.add(-2);  // return 5
kthLargest.add(-4);   // return 8
kthLargest.add(3);   // return 8

