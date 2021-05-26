/**
 * 计算排序
 * 分布式排序
 */

export const countingSort = array => {
  if (array.length < 2) return array;
  let result = [];
  const maxValue = findMaxValue(array);
  // 生成一个最大值长度的数组，然后将数组内的值作为下标，值重新记录为为该值出现的次数
  const counts = Array.from({ length: maxValue + 1 });
  array.forEach(element => {
    if (!counts[element]) {
      counts[element] = 0;
    }
    counts[element]++;
  });
  // 初始化重新生成数组的下标值
  let sortedIndex = 0;
  counts.forEach((count, i) => {
    // 如果count大于1，则说明该值出现多次，需要多次写入
    while (count > 0) {
      result[sortedIndex++] = i;
      count--;
    }
  });
  return result;
};

const findMaxValue = array => {
  let max = 0;
  array.forEach((item, i) => {
    if (item > max) {
      max = item;
    }
  });
  return max;
};
