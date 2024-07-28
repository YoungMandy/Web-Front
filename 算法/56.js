/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {

  const n = intervals.length;

  intervals.sort((a, b) => a[0] - b[0]);

  let prev = intervals[0];
  let item;
  const res = [];

  for (let i = 1; i < n; i++) {
    debugger

    let cur = intervals[i];

    if (prev[1] >= cur[0] && prev[1] < cur[1]) {
      prev = [prev[0], cur[1]]

    } else if (cur[1] < prev[1]) {

      prev = [prev[0], prev[1]];
    } else {
      res.push([...prev]);
      prev = cur;
    }
  }
  debugger
  res.push(prev);
  console.log(res);

  return res;

};

merge([[1, 4], [2, 3]]);