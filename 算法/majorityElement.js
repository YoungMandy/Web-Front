var majorityElement = function (nums) {
  const countObj = {};
   let max = -Infinity;
   let maxKey = '';

  for (let value of nums) {
    countObj[value] = countObj[value] ? ++countObj[value] : 1;
     if (countObj[value] > max) {
       max = countObj[value];
       maxKey = value;
     }
  }

  return maxKey;
};
majorityElement([3, 2, 3]);