/**
 * 动态规划（Dynamic Programming）
 * 采用动态规划求解的问题有两个特性：
 * - 最优子结构
 * - 重叠子问题
 */

const max = (a, b) => (a >= b ? a : b);

// 最长公共子序列
export const lcs = (str1, str2) => {
  const ary1 = str1.split('');
  const ary2 = str2.split('');
  let result = [];
  for (let i = 0; i < ary1.length + 1; i++) {
    result[i] = [];
    for (let j = 0; j < ary2.length + 1; j++) {
      if (i === 0 || j === 0) {
        result[i][j] = 0;
        continue;
      }
      if (ary1[i] === ary2[j]) {
        result[i][j] = result[i][j - 1] + 1;
      } else {
        const maxVal = max(result[i - 1][j], result[i][j - 1]);
        result[i][j] = maxVal;
      }
    }
  }
  return result;
};

// const total = 36
const coins = [4, 3, 1];
export const changeCoin = amount => {
  let cache = [];
  const makeChange = val => {
    if (!val) return [];
    if (cache[val]) return cache[val];
    let min = [];
    let newMin;
    let newAmount;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = val - coin;
      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }
      // TODO: 下面这些判断条件有点不太理解
      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || !min.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin);
      }
    }
    return (cache[val] = min);
  };
  return makeChange(amount);
};
