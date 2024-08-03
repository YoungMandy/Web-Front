/*
 * @desc: 
 * @param: 
 * @return: 
 * @Author: huili.local
 */
// 给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
// [−2,1,−3,4,−1,2,1,−5,4] // [4,-1,2,1]

function findMaxSum (nums) {
  const n = nums.length;

  if (n == 1) return nums[0];
  let max = nums[0];

  const f = new Array(n).fill(-Infinity).map(()=>new Array(n + 1).fill(-Infinity));
  f[0][0] = nums[0];

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++){
      f[i][j+ 1] = Math.max(f[i][j] + nums[j], nums[j]);
      max = Math.max(max, f[i][j]);
    }
  }

  console.log(max);
  return max;
}

findMaxSum([-2, 1,-3, 4,-1, 2, 1,-5, 4])
