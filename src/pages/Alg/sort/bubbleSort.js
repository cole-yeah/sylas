/**
 * 冒泡排序
 */
import { compareFn, Compare } from '../utils';

const bubbleSort = ary => {
  const { length } = ary;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (compareFn(ary[j], ary[j - 1]) === Compare.BIGGER_THAN) {
      }
    }
  }
};

let arr = [2, 10, 3, 4, 7, 1, 8, 6, 9, 5];

bubbleSort(arr);
