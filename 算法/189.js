var rotate = function(nums, k) {
  const n = nums.length;
  let count = 0;
  let i = 0;
  let temp = nums[0];

  while (count < n) {

    const newIndex = i + k > n ? (i + k - 1 )% n : i + k;
    debugger
    let next = nums[newIndex];

    nums[newIndex] = temp;

    count++;
    i = newIndex;
    temp = next;
  }

  console.log(nums);


};

rotate([1, 2, 3, 4, 5, 6, 7], 3);