/**
 * 二叉搜索树
 * 是二叉树的一种，但是只允许你在左侧点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
 */

class Node {
  constructor(key) {
    this.key = key;
    this.right = null;
    this.left = null;
  }
}

class SearchTree {
  constructor() {
    this.root = null;
  }
  // 插入新的键
  insert() {}
  // 在树种查找一个键，如果节点存在，则返回true，否则返回false
  search() {}
  // 通过中序遍历方式遍历所有节点
  inOrderTraverse() {}
  // 通过先序方式遍历所有节点
  preOrderTraverse() {}
  // 通过后序方式遍历所有节点
  postOrderTraverse() {}
  // 返回树中最小值
  min() {}
  // 返回树中最大值
  max() {}
  // 删除树中某个值
  remove() {}
}
