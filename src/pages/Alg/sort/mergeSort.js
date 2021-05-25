/**
 * 归并排序
 */
import { defaultCompare, Compare } from '../utils';

const mergerSort = array => {
  const { length } = array;
  if (length > 1) {
    const sliceIndex = Math.floor(length / 2);
    const left = array.slice(0, sliceIndex);
    const right = array.slice(sliceIndex);
  }
};

const merge = () => {};
