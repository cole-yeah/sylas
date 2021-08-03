/**
 * 完全二叉树: 设二叉树的深度为h，除第h层外，其他各层的节点数都达到最大值，
 * 第h层所有的节点都连续集中在最左边。
 *
 * 满二叉树: 一颗深度为k，且有2的k次幂 - 1个节点的二叉树2
 */

/**
 * 前置知识点
 * 二叉堆是一颗完全二叉树。（完全二叉树的概念）
 * 对于给定位置index的节点：
 * - 左子节点下标 index * 2 + 1
 * - 右子节点下标 index * 2 + 2
 * - 父节点下标 Math.floor((index - 1) / 2)
 */

const IS_A_LESS_THAN_B = true;

const compare = (a, b) => {
  return a < b === IS_A_LESS_THAN_B;
};

// const swap = () =>

class MaxHeap {
  constructor() {
    this.heap = [];
  }
  swap(pIndex, index) {
    [this.heap[pIndex], this.heap[index]] = [
      this.heap[index],
      this.heap[pIndex],
    ];
  }
  getLeftIndex(index) {
    // 位运算符，往左移一位，相当于乘以2，反之则是除以2。
    return (index << 1) + 1;
  }
  getRightIndex(index) {
    return (index << 1) + 2;
  }
  getParentIndex(index) {
    return index >> 1;
  }
  shiftUp(index) {}
  insert(value) {
    this.heap.push(value);
    // 当前插入节点的下标
    const index = this.heap.length;
    // 获取父节点下标
    const parentIndex = this.getParentIndex(index);
    const parentValue = this.heap[parentIndex];
    if (compare(parentValue, value) === IS_A_LESS_THAN_B) {
      this.swap(parentIndex, index);
      this.insert();
    }
  }
}

// const heap = new MaxHeap();
