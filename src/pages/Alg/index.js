import React, { useEffect, useState } from 'react';
import { Link } from '../../lib/router';
import { produce } from 'lib/immer';
import LinkedList from './linkedList';

// 循环
const createFlow = effects => {
  return {
    async run(cb = () => {}) {
      while (effects.length) {
        const effect = effects.shift();
        if (effect.run) {
          effect.run();
        } else if (Array.isArray(effect)) {
          await createFlow(effect).run();
        } else {
          await effect();
        }
      }
      return Promise.resolve().then(cb);
    },
  };
};

// 迭代
// const createFlow = effects => {
//   const next = async (index = 0) => {
//     if (index === effects.length) {
//       return Promise.resolve();
//     }
//     const effect = effects[index];
//     if (effect.run) {
//       return effect.run(() => next(index + 1));
//     } else if (Array.isArray(effect)) {
//       return createFlow(effect).run(() => next(index + 1));
//     } else {
//       return Promise.resolve(effect()).then(() => next(index + 1));
//     }
//   };
//   return {
//     async run(cb = () => {}) {
//       return next().then(cb);
//     },
//   };
// };

var obj = { a: { aa: 1, aaa: { aaaa: 20 } }, b: 2 };

const Alg = () => {
  const [a, setA] = useState({});
  useEffect(() => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const subFlow = createFlow([
      () => delay(1000).then(() => console.log('c')),
    ]);

    createFlow([
      () => console.log('a'),
      () => console.log('b'),
      subFlow,
      [() => delay(2000).then(() => console.log('d')), () => console.log('e')],
    ]).run(() => {
      console.log('done');
    });
  }, []);

  useEffect(() => {
    const newObj = produce(obj, draft => {
      draft.a.aaa.aaaa = 666;
      draft.b = 36;
    });

    console.log('-----', obj.a.aaa.aaaa, obj, newObj, obj === newObj);
  }, []);

  // 0-1000数字中质数
  // 质数概念 1 不是质数，质数是大于 1 的且只能被 1 和自身整除的自然数

  const fn = index => {
    let ary = [];
    let i, j;
    for (i = 2; i <= index; i++) {
      for (j = 2; j <= i; j++) {
        if (i % j === 0) break;
      }
      i === j && ary.push(i);
    }
    console.log(ary);
  };

  // 找出数组中和为给定值的两个元素，如：[1, 2, 3, 4, 5] 中找出和为 6 的两个元素。
  const fn1 = (amount = 6, count) => {
    const ary = [3, 2, 6, 3, 1, 4, 5];
    let dataAry = [];
    for (let i = 0; i < ary.length; i++) {
      for (let j = i + 1; j < ary.length; j++) {
        const a = ary[i];
        const b = ary[j];
        if (a + b === amount) {
          dataAry.push([a, b]);
        }
      }
    }
    return dataAry;
  };

  // 有点像双指针的操作，计算量比较少，唯一比较多的计算可能就是一开始的排序
  const fn2 = amount => {
    let dataAry = [];
    const ary = [3, 2, 6, 3, 1, 4, 5];
    const newAry = ary.sort((a, b) => a - b);
    let left = 0,
      right = ary.length - 1;
    while (left <= right) {
      const leftVal = newAry[left];
      const rightVal = newAry[right];
      const sum = leftVal + rightVal;
      if (sum === amount) {
        left++;
        right--;
        dataAry.push([leftVal, rightVal]);
      } else if (sum > amount) {
        right--;
      } else if (sum < amount) {
        left++;
      }
    }
    return dataAry;
  };

  // 扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2-10为数字本身，A为1，J为11...大小王可以看成任何数字，可以把它当作0处理
  const fn3 = ary => {
    const newAry = [...new Set(ary)].sort((a, b) => a - b);
    if (newAry.length === 5) {
      if (newAry[4] - newAry[0] === 4 && newAry[0] !== 0) {
        return true;
      }
    }
    return false;
  };

  // 0, 1, 1, 2, 3, 5, 8...输入任意位置，得出值
  // 迭代做法
  const fn4 = i => {
    console.time('fn4');
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
    console.timeEnd('fn4');
    return c;
  };

  const fn5 = index => {
    console.time('fn5');
    const caculate = i => {
      console.log('----------------', i);
      if (i === 0) return 0;
      if (i === 1) return 1;
      return caculate(i - 2) + caculate(i - 1);
    };
    const c = caculate(index);
    console.timeEnd('fn5');
    return c;
  };

  useEffect(() => {
    const a = fn(1000);
    console.log('----xxxxxxxx', fn4(10), fn5(10));
  }, []);

  // 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

  const handleClick = () => {
    const newObj = produce(obj, draft => {
      draft.b = draft.b + 1;
    });
    setA(newObj);
    console.log('xxxxxxxxxxxx', newObj, obj);
  };

  // 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）
  // 斐波那契数列
  const fn7 = n => {
    if (n === 1) return 1;
    if (n === 2) return 2;
  };

  useEffect(() => {
    const link = new LinkedList();
    link.push(3);
    link.push(90);
    link.push('ddd');
    console.log('xxxxx', link);
  }, []);

  return (
    <div>
      <Link to="/main">go to main page</Link>
      <div onClick={() => handleClick()}>click me {a.b}</div>
    </div>
  );
};

export default Alg;
