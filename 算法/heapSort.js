const list = [64, 99, 7, 4, 3, 2, 5, 7, 43, 2, 6, 8, 5, 2];
 

const buildHeap = function(arr = [], len = 0)
{
  for (let i = Math.floor(len / 2); i > 0; i--)//从最后一个非叶子节点开始堆化
  {
    shiftUp(arr, len, i);
  }
}

const swap = (arr, index1, index2) =>
{
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

// 从第一个非叶子节点开始向上调整
const shiftUp = (arr, len, i) =>
{
  
  let maxPos = i;
  while (true)
  {
    if (i * 2 + 1 < len && arr[i * 2 + 1] > arr[i]) maxPos = i * 2 + 1;
    if (i * 2 + 2 < len && arr[i * 2 + 2] > arr[maxPos]) maxPos = i * 2 + 2;

    if (maxPos === i) break;
    
    swap(arr, i, maxPos);

    i = maxPos;
  }
  
}

const heapSort = function (arr = []) {
  const len = arr.length;
  const res = arr;

  buildHeap(res, len);
  console.log('buildHeap: ' + res);
  let k = len;
  while (k)
  {
    
    swap(res, 0, k - 1);
    k--;
    shiftUp(res, k, 0);
    
  }

  console.log('res', res);
};

heapSort(list);