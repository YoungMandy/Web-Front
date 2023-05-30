/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const LIS = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    const index = findIndex(LIS, nums[i]);
    console.log('LIS', LIS);
     console.log('nums[i]', nums[i]);
    console.log('index', index);
   
    console.log('\n');

      // 可以插入
      if (index == LIS.length) {
        LIS.push(nums[i]);
      } else {
        LIS[index] = nums[i];
      }
  }
console.log(LIS)
  return LIS.length;
};

function findIndex(list, target) {
  let left = 0;
  let right = list.length;

  while (left < right) {
     mid = left + Math.floor((right - left) / 2);
  
    if (list[mid] < target) {

      left = mid + 1;

    } else {
      right = mid;
    }
    
  }
 
  return left;
}

console.log(lengthOfLIS([3, 5, 6, 2, 5, 4, 19, 5, 6, 7, 12]));
