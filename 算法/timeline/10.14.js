
function findTarget (arr,target) {
  const memo = {};

  for (let i = 0; i < arr.length; i++) { 
    const a = arr[i];
    const b = target - a;

    if (memo[b] !== undefined) {
      return [i,memo[b]]
    }

    memo[a] = i;
  }
}