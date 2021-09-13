/**
 * 快排 (使用分而治之)，复杂度O(nlog(n))
 * - 选择主元（pivot），数组中间的值
 * - 创建两个指针，左边一个指向第一个值，右边一个指向最后一个值。
 * 移动左指针直到找到比主元大的值，移动右指针直到找到比主元小的值，然后交换它们
 * 直到左指针超过右指针
 */
// import { defaultCompare, Compare, swap } from '../utils';

// export const quickSort = array => {
//   quick(array, 0, array.length - 1);
//   return array;
// };

// const quick = (array, left, right) => {
//   const index = partition(array, left, right);
//   if (array.length > 1) {
//     // 如果子数组存在较小值元素，重复过程进行排序
//     if (left < index - 1) {
//       quick(array, left, index - 1);
//     }
//     // 如果子数组存在较大值元素，重复过程进行排序
//     if (index < right) {
//       quick(array, index, right);
//     }
//     return array;
//   }
// };

// const partition = (array, left, right, compareFn = defaultCompare) => {
//   const pivot = array[Math.floor((left + right) / 2)]; // 主元
//   let i = left;
//   let j = right;
//   while (i <= j) {
//     // 左边找出比主元大的值下标
//     while (compareFn(array[i], pivot) === Compare.LESS_THAT) {
//       i++; // 指针向后移动
//     }
//     // 右边找出比主元小的值下标
//     while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
//       j--;
//     }
//     // 换位置
//     if (i <= j) {
//       swap(array, i, j);
//       i++;
//       j--;
//     }
//   }
//   return i;
// };

var findIntegers = function (n) {
  let arr = [];
  const max = n.toString(2);
  const isValid = str => {
    return str.replace('11', '').length === str.length;
  };
  const backtrack = (l, str) => {
    if (l === 0) {
      const num = Number(str);
      if (arr.includes(num)) return;
      if (!isValid(str)) return;
      if (str.length === max.length) {
        if (num > Number(max)) {
          return;
        }
      }
      arr.push(num);
      return;
    }
    ['0', '1'].forEach(item => {
      backtrack(l - 1, str + item);
    });
  };
  // 回溯算法,找出所有排列的可能
  for (let i = 0; i <= max.length; i++) {
    backtrack(i, '');
  }
  return arr.length;
};

findIntegers(100000);
console.log('xxxxx');
