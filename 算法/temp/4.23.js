// input: (nums = [1, 2, 3, 4, 5, 1]), (target = 5);
// [1, 2, 3, 4, 5, 1, 4], (target = 5);

const findTarget = function (nums, target) {
  const n = nums.length;

  if (n < 2) return [];
  const res = [];

  for (let i = 0; i < n; i++) {
    let a = nums[i];
    let b = target - a;

    if (!(a in map)) {
      // 当前数是第一次访问
      map[a] = 1;
    } else {
      // 当前数不是第一次访问
      map[a]++;
    }

    if (b in map) {
      res.push([a, b]);
      map[b]--;
      map[a]--;

      if (map[b] === 0) {
        delete map[b];
      }

      if (map[a] === 0) {
        delete map[a];
      }
    }
  }
  console.log('res',res)
  return res;
};

findTarget([1, 2, 3, 4, 5, 1, 4], 5);
