var fourSum = function (nums, target) {
  if (nums.length < 4) {
    return [];
  }

  nums.sort((a, b) => a - b); // 升序排列
  const res = [];
  debugger

  for (let i = 0; i < nums.length - 3; i++)
  {
    console.log('进入for循环');
    if (nums[i] === nums[i - 1] && i < nums.length - 3)
    {
      console.log("继续");
      continue;
    }
    debugger

    for (let j = i + 1; j < nums.length - 2; j++)
    {
      debugger
      let left = j + 1;
      let right = nums.length - 1;

      while (left < right) {
        let sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          res.push([nums[i], nums[left], nums[j], nums[right]]);

          while (nums[left + 1] === nums[left]) left++;
          while (nums[right - 1] === nums[right]) right--;

          left++;
          right--;
        } else if (sum > target) {
          right--;
        } else if (sum < target) {
          left++;
        }
      }

      while (nums[j + 1] === nums[j]) {
        j++;
      }
    }
  }

  return res;
};


console.log(fourSum([0,0,0,0],0));