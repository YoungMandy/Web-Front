/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const res = [];

  const set = new Set();

  function dfs(list, arr) {
    if (arr.length == n) {
      res.push([...arr]);
      return;
    }

    for (let i = 0; i < n; i++) {
      const val = list[i];

      if (i > 0 && list[i - 1] == list[i] && set.has(i - 1)) { continue; }

      if (!set.has(i)) {
        arr.push(val);
       
        set.add(i);

        dfs(list, arr);

        arr.pop();
        set.delete(i);
      }
    }
  }

  dfs(nums, []);

  return res;
};

console.log(permuteUnique([1,1,2]));
