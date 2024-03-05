/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const n = nums.length;
  let step = 0;
  let count = 0;
debugger
  for (let i = 0; i < n - count; i++) {
    let curr = nums[i];
    debugger
    if (curr == 0) {
      step += 1; // 非0元素需要前移
      count++;
    } else {
      nums[i - step] = curr;
      step = 0;
    }
  }

  for (j = 0; j < count; j++) {
    nums[count + j] = 0;
  }

  console.log(nums);

  return nums;
};

moveZeroes([0, 1, 0, 3, 12]);
