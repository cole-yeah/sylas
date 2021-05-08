import React, { useEffect } from 'react';
import useLog from 'common/hooks/useLog';
//斐波那契数列（Fibonacci sequence），又称黄金分割数列

const Fibonacci = () => {
  const [logFn, LogView] = useLog();

  // 递归解法
  const fn5 = index => {
    const caculate = i => {
      if (i === 0) return 0;
      if (i === 1) return 1;
      return caculate(i - 2) + caculate(i - 1);
    };
    const c = caculate(index);
    return c;
  };
  // 0, 1, 1, 2, 3, 5, 8...输入任意位置，得出值
  // 迭代做法
  const fn4 = i => {
    if (i === 0) return 0;
    if (i === 1) return 1;
    let index = 2;
    let a = 0,
      b = 1,
      c = 0;
    while (index <= i) {
      c = a + b;
      a = b;
      b = c;
      index++;
    }
    return c;
  };

  useEffect(() => {
    logFn('Fibonacci: ===', fn4(10), fn5(10));
  }, [logFn]);

  return (
    <div>
      <div></div>
      <LogView />
    </div>
  );
};

export default Fibonacci;
