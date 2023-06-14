// 1.冒泡排序 时间复杂度(n²)，稳定
function bubbleSort (arr) {
  const len = arr.length;
  // 倒推，每次都把最大的数放后面
  for (let i = 0; i < len - 1; i++){
    for (let j = 0; j < len - 1 - i; j++){
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

// 2.选择排序 时间复杂度O(n²)
// 每次从无序的数组中选择最小的元素，与最数组中第一个无序的元素交换位置
function selectionSort (arr) {
  const len = arr.length;
  let minIndex = 0;
  let temp;
  for (let i = 0; i < len - 1; i++){
    minIndex = i;
    for (let j = i + 1; j < len; j++){
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}

//3.插入排序 时间复杂度O(n²) 稳定排序
function insertionSort (arr) {
  const len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) { 
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) { 
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

// 4.归并排序 O(nlogn) 稳定
function mergeSort (arr) {
  let len = arr.length;
  if (len < 2) {
    return arr;
  }

  let middle = Math.floor(len / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
function merge (left, right) {
  const res = [];
  while (left.length > 0 && right.length > 0) { 
    if (left[0] <= right) {
      res.push(left.shift());// 删除首元素
    } else {
      res.push(right.shift())
    }
  }
  while (left.length) {
    res.push(left.shift());
  }
  while (right.length) {
    res.push(right.shift())
  }

  return res;
}
