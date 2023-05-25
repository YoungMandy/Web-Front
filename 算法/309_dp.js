/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
 // 状态在买入(buy),卖出(sold),冷冻(freeze)之间轮转
  let [buy,sold,freeze] = [-prices[0],0,0]
  
  for (let i = 1; i < prices.length; i++) {
    let preBuy = buy;
    let preSold = sold;

    buy = Math.max(preBuy, freeze - prices[i]);
    sold =  preBuy + prices[i];
    freeze = Math.max(freeze, preSold)
  }

  return Math.max(sold, freeze);
};
