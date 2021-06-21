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
      result[i][j] = max(result[i - 1][j], result[i][j - 1]);
      if (ary1[i] === ary2[j]) {
        result[i][j] = Math.max(result[i][j], result[i - 1][j - 1] + 1);
      }
    }
  }
  return result;
};
export const lcs_1 = (str1, str2) => {
  const result = Array.from({ length: str1.length + 1 }, () =>
    Array(str2.length + 1).fill(0),
  );
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      result[i][j] = Math.max(result[i - 1][j], result[i][j - 1]);
      if (str1[i - 1] === str2[j - 1]) {
        result[i][j] = Math.max(result[i][j], result[i - 1][j - 1] + 1);
      }
    }
  }
};
/**
 * 最长公共子序列，输出公共序列
 * 如：1a2b3c4d567 和 1k2i3o4u5的公共子序列是12345，则返回12345
 */
export const lcs_2 = (s1, s2) => {};

/**
 * 最少找零
 */
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

export const changeCoin_1 = amount => {
  const result = Array(amount + 1).fill(Infinity);
  result[0] = 0; // 如果为0，则找零也为0
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      result[i] = Math.min(result[i], result[i - coin] + 1);
    }
  }
};

/**
 * 背包问题
 */
export const bag = () => {};

/**
 * 打家劫舍
 */

/**
 * 最长上升子序列
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4
 */
export const lis = ary => {
  if (!ary.length) return 0;
  if (ary.length === 1) return 1;
  let maxLength = 1;
  let curLength = 1;
  for (let i = 0; i < ary.length - 1; i++) {
    const cur = ary[i];
    const next = ary[i + 1];
    if (next > cur) {
      curLength++;
      maxLength = Math.max(maxLength, curLength);
      continue;
    }
    curLength = 1;
  }
  return maxLength;
};
