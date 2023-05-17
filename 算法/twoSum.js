var twoSum = function (nums, target) {
  let res = [];

  for (let i = 0; i < nums.length; i++)
  {
    debugger
    for (let j = nums.length - 1; j < i; j--)
    {
      debugger
      console.log(nums[i] + nums[j]);
      if (nums[i] + nums[j] === target)
      {
       
        res = [nums[i], nums[j]];
        break;
       
      }
    }
  }

   return res;

};


console.log(twoSum([2,7,11,15],9))