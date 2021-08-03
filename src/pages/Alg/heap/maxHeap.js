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

class MaxHeap {
  constructor() {
    this.heap = [];
  }
  getSize() {
    return this.heap.length;
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
  // 上移操作
  shiftUp(index) {
    if (index === 0) return;
    // 获取父节点下标
    const parentIndex = this.getParentIndex(index);
    const value = this.heap[index];
    const parentValue = this.heap[parentIndex];
    if (compare(parentValue, value) === IS_A_LESS_THAN_B) {
      this.swap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }
  insert(value) {
    this.heap.push(value);
    const index = this.heap.length - 1;
    this.shiftUp(index);
  }
  shiftDown(index) {
    let dummyIndex = index;
    const size = this.getSize();
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    const indexAry = [index, leftIndex, rightIndex];
    // 下标如果超过heap长度，直接返回
    if (indexAry.some(i => i > size)) return;
    // 取值，判断大小
    const value = this.heap[index];
    const leftValue = this.heap[leftIndex];
    const rightValue = this.heap[rightIndex];
    if (compare(value, leftValue) === IS_A_LESS_THAN_B) {
      index = leftIndex;
    } else if (compare(value, rightValue) === IS_A_LESS_THAN_B) {
      index = rightIndex;
    }
    if (dummyIndex !== index) {
      this.swap(dummyIndex, index);
      this.shiftDown(index);
    }
  }
  // 取出最大值
  pop() {
    const size = this.getSize();
    if (size === 0) return undefined;
    if (size === 1) {
      return this.heap.shift();
    }
    const maxValue = this.heap[0];
    // 将最子级节点移到根节点
    this.heap[0] = this.heap.pop();
    // 对最大二叉堆进行重新排序
    this.shiftDown(0);
    return maxValue;
  }
}

const h = new MaxHeap();
h.insert(2);
h.insert(5);
h.insert(4);
h.insert(1);

h.pop();
