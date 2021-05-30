/**
 * 动态规划（dynamic programming DP）
 * 是一种将复杂问题分解成更小的子问题来解决的优化技术
 * - 定义子问题
 * - 实现要反复执行来解决子问题的部分
 * - 识别并求解出基线条件
 */

// 最少硬币找零
const minCoin = (coins, amount) => {
  const cache = [];
  const makeChange = value => {
    let min = [];
    let newMin = [];
    let newAmount = 0;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = value - coin;
      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }
      if (
        newAmount >= 0 &&
        (newMin.length < minCoin.length - 1 || !minCoin.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin);
      }
    }
    return (cache[value] = min);
  };
  return makeChange(amount);
};

export default minCoin;
