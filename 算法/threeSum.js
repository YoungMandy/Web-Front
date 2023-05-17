//方法一
// var threeSum = function (nums) {
//   if (nums.length < 3) {
//     return [];
//   }

//   nums.sort();
//   const res = [];

//   for (let i = 0; i < nums.length - 2; i++) {
//     if (i >= 1 && nums[i] === nums[i - 1]) {
//       continue; // 相等的a 可以跳到下一个判断
//     }

//     const dir = {};

//     for (let j = i + 1; j < nums.length; j++) {
//       const c = -(nums[i] + nums[j]);

//       if (!dir.hasOwnProperty(nums[j])) {
//         // 相当于找到了之前存储的 -(a + b), 那么当前值nums[j], nums[i] ,和 c 的相加等于0并且都在这个数组里
//         dir[c] = 1;
//       } else {
//         res.push([nums[i], c, nums[j]]); // nums[j]是最后找到的数，应该是最大
//         while (nums[j + 1] === nums[j]) {
//           // 去重
//           j++;
//         }
//       }
//     }
//   }

//   return res;
// };

//方法二
var threeSum = function(nums)
{
  if (nums.length < 3)
  {
    return []
  }

  nums.sort((a,b) => a - b);//递增的数组

  const res = [];

  for (let i = 0; i < nums.length - 2; i++)
  {
    if (nums[i] > 0) return res;// 排序之后nums[i]最小，如果它都大于0，那么其他数也是大于0的
    if (nums[i] === nums[i - 1])
    {
      continue;//去重
    }
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right)
    {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum === 0)
      {
        res.push([nums[i], nums[left], nums[right]]);

        while(right > left && nums[left + 1] === nums[left] ) left++
        while (right > left && nums[right - 1] === nums[right]) right--;

        left ++;
        right--;

      }else if (sum > 0) right--;
       else if (sum < 0) left++;

    }

  }

  return res;
}

console.log(threeSum([0, 0, 0,0]));
