class MaxHeap
{
  constructor (val = [])
  {
    this.list = val;
  }

  size ()
  {
    return this.list.length;
  }

  insert (val)
  {
    this.list.push(val);
    this.shiftUp(this.list, this.size(), this.size() - 1);
  }

  remove (i)
  {
    if (!this.list.length) return null;
    const removeItem =  this.list[0];// 堆顶元素师放到数组第一位的
    this.list[0]= (this.list[this.list.length - 1]);
    this.list.pop();
    this.shiftDown(this.list, this.size(), 0);
    return removeItem;
  }

  //往上调整，新加入堆的元素放到叶子节点，然后向上调整
  shiftUp (arr,size,i)
  {
    while (Math.floor((i - 1) / 2) < size && arr[Math.floor((i - 1) / 2)] < arr[i]) {
      this.swap(arr, i, Math.floor((i - 1) / 2));
      i = Math.floor((i - 1) / 2);
    }
  }

  // 向下调整，将栈顶元素删除后，将最底层的叶子节点放到栈顶，然后调整顺序
  shiftDown (arr,size,i)
  {
    let maxPosition = i;
    while (true)
    {
       if (2 * i + 1 < size && arr[2 * i + 1] > arr[maxPosition])
         maxPosition = 2 * i + 1;
       if (2 * i + 2 < size && arr[2 * i + 2] > arr[maxPosition])
         maxPosition = 2 * i + 2;
      
      if (maxPosition === i)
      {
        break;
      }

      this.swap(arr, i, maxPosition);

      i = maxPosition;
    }
  }

  swap (list, index1, index2)
  {
    [list[index1], list[index2]] = [list[index2], list[index1]];
  }

}