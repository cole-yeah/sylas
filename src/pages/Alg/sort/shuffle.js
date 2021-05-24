/**
 * 随机算法
 * 洗牌算法
 */
import { swap } from '../utils';

export const shuffle1 = ary => {
  const { length } = ary;
  // 一开始写的是这种从0开始遍历的写法。
  // 比如当i为6的情况下，取到的randomIndex依然可能为0
  // 最差的情况会导致重排之后的值还是和之前一致
  // for (let i = 0; i < length; i++) {
  //   const randomIndex = Math.floor(Math.random() * (i + 1));
  //   swap(ary, i, randomIndex);
  // }
  for (let i = length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    swap(ary, i, randomIndex);
  }
};

export const shuffle2 = ary => {
  let newAry = [];
  while (ary.length) {
    const randomIndex = Math.floor(Math.random() * ary.length);
    const item = ary[randomIndex];
    newAry.push(item);
    ary.splice(randomIndex, 1);
  }
  return newAry;
};
