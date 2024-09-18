var minFallingPathSum = function(matrix) {

  const n = matrix.length;

  const f = new Array(n).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    f[0][i] = matrix[0][i];
  }

  for (let i = 1; i < n; i++) {

    f[i][0] = Math.min(f[i - 1][0], f[i - 1][1]) + matrix[i][0];

    for (let j = 1; j < n - 1; j++) {

      f[i][j] = Math.min(f[i - 1][j], f[i - 1][j + 1]) + matrix[i][j]

    }

    f[i][n - 1] = Math.min(f[i - 1][n - 2], f[i - 1][n - 1]) + matrix[i][n - 1]
  }

debugger

  let min = Infinity;
  for (let i = 0; i < n; i++) { 
    const val = f[n - 1][i];
    min = Math.min(val, min)
  }
  console.log(min);

  return min;

};
// minFallingPathSum([[2, 1, 3], [6, 5, 4], [7, 8, 9]])
// minFallingPathSum([[-19, 57], [-40, -5]])
minFallingPathSum([[-84, -36, 2], [87, -79, 10], [42, 10, 63]])