/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {

  const res = [];
  const n = nums.length;

  const path = new Array(n);

  const visited = new Array(n).fill(false);
  console.log('visited', visited);

  function dfs (i) {
    if (i == n) {

      res.push(JSON.parse(JSON.stringify(path)));
      return;
    }

    for (let j = 0; j < n; j++) {
      if (!visited[j]) {
        path[i] = nums[j];
        visited[j] = true;

        dfs(i + 1);
        visited[j] = false;
      }
    }
  }

  dfs(0);

  return res;

};

permute([1, 2, 3]);