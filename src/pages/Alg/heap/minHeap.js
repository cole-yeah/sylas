/**
 * 二叉堆
 * - 一颗完全二叉树
 * - 二叉堆不是最小堆就是最大堆
 */

import { swap } from '../utils';

const Compare = {
  LESS_THAT: -1,
  BIGGER_THAN: 1,
};

const defaultCompare = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAT : Compare.BIGGER_THAN;
};

class MinHeap {
  constructor() {
    this.heap = [];
    this.compare = defaultCompare;
  }
  getLeftIndex(index) {
    return 2 * index + 1;
  }
  getRightIndex(index) {
    return 2 * index + 2;
  }
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }
  // 上移操作
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compare(this.heap[parent], this.heap[index]) > Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }
  // 下移操作
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (
      left < size &&
      this.compare(this.heap[element], this.heap[left]) > Compare.BIGGER_THAN
    ) {
      element = left;
    }
    if (
      right < size &&
      this.compare(this.heap[element], this.heap[right]) > Compare.BIGGER_THAN
    ) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }
  // 向堆中插入一个新的值。插入成功返回true，否则返回false
  insert(value) {
    if (value !== null) {
      this.heap.push(value);
      // this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }
  // 移除最大值或最小值，并返回这个值
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removeValue = this.heap.shift();
    this.shiftDown(0);
    return removeValue;
  }
  // 返回最大值（最大堆）或返回最小值（最小堆），且不会移除这个值
  findMinimum() {
    return this.isEmpty ? undefined : this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

export default MinHeap;
