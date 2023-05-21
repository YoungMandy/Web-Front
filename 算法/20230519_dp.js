/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  const len = prices.length;
  const K = k + 1;
  let max = 0;

  const dp = new Array(len)
    .fill(0)
    .map(() => new Array(K).fill(0).map(() => new Array(2).fill(0)));

  dp[0][0][0] = 0;
  dp[0][0][1] = - prices[0];
  dp[0][1][1] = - prices[0];
  dp[0][1][0] = - Number.MAX_VALUE;

  // 买入1次记为k + 1;

  for (let i = 1; i < len; i++) {
    for (let k = 1; k < K; k++) {
      if (k > i) {//第i天不可能已经操作了大于i次
        dp[i][k][0] = -prices[0];
      }
      
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);

     
      max = Math.max(max, dp[i][k][0]);
      
     
      
      console.log(JSON.stringify(dp))
     
    }
  }
  console.log('max: ' + max);
  console.log('dp[1][1][0]: ' + dp[1][1][0]);
  console.log('dp[1][2][1]: ' + dp[1][2][1]);
  console.log('prices[2]: ' + prices[2]);
  console.log('dp[2][2][0]: ' + dp[2][2][0]);
  console.log('dp[1][2][0]: ' + dp[1][2][0]);
  console.log('dp[2][2][1]: ' + dp[2][2][1]);

  return max;
};


maxProfit(2,[1,2,4]);