function longestArithSeqLength (nums) {
  const n = nums.length;

  let max = -Infinity;
  let min = Infinity;

  for (let i = 0; i < n; i++) {
    const cur = nums[i];
    max = Math.max(max, cur);
    min = Math.min(min, cur);

  }

  const diff = max - min;// 公差的范围的绝对值

  let res = 1;
  for (let d = -diff; d <= diff; d++) {
    const f = new Array(max + 1).fill(-1);// 以元素nums[i]结尾的，公差为d的等差数列的长度

    for (let num of nums) {
      const prev = num - d;

      if (prev >= min && prev <= max && f[prev] !== -1) {
        f[num] = Math.max(f[num], f[prev] + 1);

        res = Math.max(res, f[num])
      }

      f[num] = Math.max(f[num], 1)
    }
  }

  return res;


};
longestArithSeqLength([9, 4, 7, 2, 10]);