/**
 * 最少硬币找零
 */

// 动态规划版本

// 贪心算法
// 这个要求coins是排序了的
const fn1 = (coins, amount) => {
  const change = [];
  let total = 0;
  for (let i = coins.length; i > 0; i--) {
    const coin = coins[i];
    while (coin + total <= amount) {
      change.push(coin);
      total += coin;
    }
  }
};
