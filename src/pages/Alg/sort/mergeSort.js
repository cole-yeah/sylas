/**
 * 归并排序
 * 分而治之，将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组
 * 归并排序也是递归。
 */
import { defaultCompare, Compare } from '../utils';

const mergerSort = array => {
  const { length } = array;
  // 基线条件
  if (length > 1) {
    const sliceIndex = Math.floor(length / 2);
    // 最重要的一步，对每个数组进行截取到长度为1，然后对其进行比较，在合并返回
    const left = mergerSort(array.slice(0, sliceIndex));
    const right = mergerSort(array.slice(sliceIndex));
    array = merge(left, right);
  }
  return array;
};

const merge = (left, right) => {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    const isAlessThanB =
      defaultCompare(left[i], right[j]) === Compare.LESS_THAT;
    const val = isAlessThanB ? left[i++] : right[j++];
    result.push(val);
  }
  /**
   * 使用 i < left.length来判断
   * 是由于在上面while判断条件中，有两个条件，当某个不成立时，则不再迭代
   * i < left.length说明left数组内的值都存到result中了，所以对剩余的right的值进行截取并添加到数组后
   */
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
};

export default mergerSort;
