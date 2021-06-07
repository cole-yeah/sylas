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
