
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let n = nums.length;
  nums.sort((a, b) => a - b); // 升序排序

  let res = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < n - 2; i++) {
    let pb = i + 1;
    let pc = n - 1;

    while (pb < pc) {
      let sum = nums[i] + nums[pb] + nums[pc];

      if (Math.abs(target - sum) < Math.abs(target - res)) {
        res = sum;
      }

      if (sum == target) {
        return target;
      }
      if (sum < target) {
        pb++;
      }
      if (sum > target) {
        pc--;
      }
    }
  }
  return res;
};

console.log(threeSumClosest([-1, 2, 1, -4],1));
