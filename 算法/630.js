class MaxPriorityQueue {
  constructor() {
    this.list = [];
  }

  // 插入元素，元素放到最后，向上调整堆
  add(element) {
    this.list.push(element);
    this.shiftUp();
  }

  // 删除堆顶元素，然后把最后一个元素放到堆顶，然后调整堆
  remove() {
    if (!this.list.length) {
      return null;
    } else if (this.list.length > 1) {
      const removeElement = this.list[0];
      const lastElement = this.list[this.list.length - 1];
      this.list[0] = lastElement;
      this.list.pop();
      this.shiftDown();
      return removeElement;
    } else {
      return this.list.pop();
    }
  }

  isEmpty() {
    return !this.list.length;
  }

  front() {
    if (this.list.length) {
      return this.list[0];
    }
    return null;
  }

  size () {
    return this.list.length;
  }

  shiftUp() {
    const size = this.list.length;
    let i = size - 1;
    const arr = this.list;

    while (
      Math.floor((i - 1) / 2) < size &&
      arr[Math.floor((i - 1) / 2)] < arr[i]
    ) {
      this.swap(arr, i, Math.floor((i - 1) / 2));
    }
  }

  shiftDown() {
    const arr = this.list;
    const size = arr.length;
    let i = 0;

    let maxPosition = i;

    while (true) {
      if (2 * i + 1 < size && arr[2 * i + 1] > arr[maxPosition]) {
        maxPosition = 2 * i + 1;
      }

      if (2 * i + 2 < size && arr[2 * i + 2] > arr[maxPosition]) {
        maxPosition = 2 * i + 2;
      }

      if (maxPosition == i) break;

      this.swap(arr, i, maxPosition);

      i = maxPosition;
    }
  }

  swap(list, idx1, idx2) {
    [list[idx1], list[idx2]] = [list[idx2], list[idx1]];
  }
}

var scheduleCourse = function (courses) {
  courses.sort((a, b) => a[1] - b[1]); // 按lastDay从小到大排序

  const pq = new MaxPriorityQueue();
  let day = 0;

  for (const [duration, lastDay] of courses) {
    if (day + duration <= lastDay) {
      day += duration;
      pq.add(duration);
    } else if (!pq.isEmpty() && duration < pq.front().element) {
      day -= pq.remove() - duration;
      pq.add(duration);
    }
  }

  return pq.size();
};

console.log(scheduleCourse([
  [100, 200],
  [200, 1300],
  [1000, 1250],
  [2000, 3200],
]));
