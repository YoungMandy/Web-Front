var canPartition = function(nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  debugger

  let l = 0;
  let r = n - 1;
  let left = nums[0];
  let right = nums[n - 1];

  while (l + 1< r) {
    if (left <= right) {
      left += nums[++l];
    } else {
      right += nums[--r];
    }
  }
  return left == right;

};

canPartition([1, 5, 11, 5]);