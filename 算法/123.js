/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const n = prices.length;

  const dp = new Array(3)
    .fill(0)
    .map(() =>
      new Array(n).fill(0).map(() => new Array(2).fill(0))
    ); // dp[k][i][0] 表示第k次交易，手上0股的收益

  //  console.log(1,dp);

   for (let i = 0; i < n; i++) {
     dp[1][i][1] = -prices[i]; // 在第i天第1次买入股票
     dp[0][i][0] = -Number.MAX_SAFE_INTEGER; // 在第i天第1次买入股票
   }

  //  console.log(2,dp);

 
  for (let k = 1; k <= 2; k++) {
       for (let i = 1; i < n; i++) {
         debugger;
         dp[k][i][0] = Math.max(dp[k][i - 1][0], dp[k][i - 1][1] + prices[i]);
         dp[k][i][1] = Math.max(
           dp[k][i - 1][1],
           dp[k - 1][i - 1][0] - prices[i]
         );
       }
  }

  // console.log(3,dp)
  console.log('dp[1][n - 1][0]', dp[1][n - 1][0]);
  console.log('dp[2][n - 1][0]', dp[2][n - 1][0]);

  return Math.max(0, dp[1][n - 1][0], dp[2][n - 1][0]);
};

console.log(maxProfit([1, 2, 3, 4, 5]));
