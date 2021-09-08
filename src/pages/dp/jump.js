/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  if (s.startsWith('0')) {
    return 0;
  }
  let dp = [];
  dp[0] = 1;
  let length = s.length;
  for (let i = 1; i < length; i++) {
    const cur = s[i];
    const prev = i === 0 ? '' : s[i - 1];
    const next = i === length - 1 ? '' : s[i + 1];
    if (cur === '0' || prev === '0' || next === '0') {
      dp[i] = dp[i - 1];
      continue;
    }
    let num = 0;
    let val = cur;
    if (i === 1) {
      val = `${prev}${val}`;
    } else {
      val = `${val}${next}`;
    }
    Number(val) <= 26 && (num += 1);
    dp[i] = (i === 0 ? 0 : dp[i - 1]) + num;
  }
  return dp[length - 1];
};

var numSquares = function (n) {
  // 像最少找零的延伸版
  const num = Math.sqrt(n);
  const strNum = String(num);
  if (!strNum.includes('.')) {
    return 1;
  }
  const floorNum = Math.floor(num);
  let dp = [];
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= floorNum; j++) {
      const square = j * j;
      // dp[i] =
    }
  }
};
