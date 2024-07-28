var subarraySum = function(nums, k) {
  const n = nums.length;
  let res = 0;
  const map = {};

  function dfs (i, sum) {
    debugger
    const key = `${i}-${sum}`;
    if (map[key] !== undefined) { return };

    if (i > 0 && sum == k) {
      res += 1;
      return;
    }

    if (i == n) {
      return
    }


    const x = nums[i];

    // 选
    dfs(i + 1, sum + x);


    // 不接
    dfs(i + 1, 0);
    map[key] = 1;

  }

  dfs(0, 0);
  console.log(res);

  return res;

};

subarraySum([1], 0)