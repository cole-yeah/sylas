import React, { useEffect, useState } from 'react';
import LinkedList from './linkedList';
import Fibonacci from './components/Fibonacci';
import LinkedListView from './components/LinkedList';
import StackOnObject from './stack/stackOnObject';

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

const Alg = () => {
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

  // 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

  useEffect(() => {
    const link = new LinkedList();
    link.push(3);
    link.push(90);
    link.push('ddd');
    console.log('xxxxx', link);
  }, []);

  useEffect(() => {
    const stack = new StackOnObject();
    stack.push('2');
    stack.push('009');
    stack.items = { ddd: 2222 };
    console.log('111111111', stack);
  }, []);

  // 最短单词解法
  useEffect(() => {
    let words = ['practice', 'makes', 'perfect', 'coding', 'makes'];
    function fn(a, b) {
      let i0 = -1,
        i1 = -1;
      for (let i = 0; i < words.length; i++) {
        let item = words[i];
        if (i0 !== -1 && i1 !== -1) {
          break;
        }
        if (item === a && i0 === -1) {
          i0 = i;
          continue;
        }
        if (item === b && i1 === -1) {
          i1 = i;
          continue;
        }
      }
      const val = i0 > i1 ? i0 - i1 : i1 - i0;
      return val - 1;
    }
    fn('makes', 'coding');
  }, []);

  return (
    <div>
      <Fibonacci />
      <LinkedListView />
    </div>
  );
};

export default Alg;
